import {login, logout } from '../../actions/auth';

test('should create login action object', () => {
    const action = login('id');
    expect(action).toEqual({
        type: 'LOGIN',
        uid: 'id',
    });
})

test('should create logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
})