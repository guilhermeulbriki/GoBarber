import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from '../../hooks/Auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    apiMock.onPost('sessions').reply(200, {
      user: {
        id: 'user123',
        name: 'gui',
        email: 'gui@gmail.com',
      },
      token: 'token-123',
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.sigIn({
      email: 'gui@gmail.com',
      password: '123123',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user.email).toEqual('gui@gmail.com');
  });

  it('should restore saved date from storage when auth inits', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';

        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user123',
            name: 'gui',
            email: 'gui@gmail.com',
          });

        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.sigIn({
      email: 'gui@gmail.com',
      password: '123123',
    });

    expect(result.current.user.email).toEqual('gui@gmail.com');
  });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';

        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user123',
            name: 'gui',
            email: 'gui@gmail.com',
          });

        default:
          return null;
      }
    });

    const removeItem = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItem).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', async () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user123',
      name: 'gui',
      email: 'gui@gmail.com',
      avatar_url: 'image.jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItem).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
    expect(result.current.user).toEqual(user);
  });
});
