import authReducer from '../../reducers/auth';

test('should create login action object', () => {
    const action = {
        type: 'LOGIN',
        uid: 'id',
    }

    const state = authReducer(undefined, action);
    expect(state.uid).toBe(action.uid);
})

test('should create logout action object', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({uid: 'something'}, action);
    expect(state.uid).toBe(undefined);
})