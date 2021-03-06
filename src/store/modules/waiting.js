import { createAction, handleActions } from 'redux-actions';

const CHANGE_INPUT = 'waiting/CHANGE_INPUT'; // 인풋 값 변경
const CREATE = 'waiting/CREATE'; // 명단에 이름 추가
const ENTER = 'waiting/ENTER'; // 입장
const LEAVE = 'waiting/LEAVE'; // 나감

// export const changeInput = text => ({ type: CHANGE_INPUT, payload: text });
// export const create = text => ({ type: CREATE, payload: text });
// export const enter = id => ({ type: ENTER, payload: id });
// export const leave = id => ({ type: LEAVE, payload: id })



let id = 3;

//redux-actions의 createAction을 이용한 action함수 만들기
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++ }));
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);


const initialState = {
    input: '',
    list: [
        {
            id: 0,
            name: "홍길동",
            entered: true,
        },
        {
            id: 1,
            name: "콩쥐",
            entered: false,
        },
        {
            id: 2,
            name: "팥쥐",
            entered: false,
        }
    ]
}
//redux-actions의 handleActions를 이용한 리듀서 작성
export default handleActions(
    {
        [CHANGE_INPUT]: (state, action) => ({
            ...state,
            input: action.payload,
        }),
        [CREATE]: (state, action) => ({
            ...state,
            list: state.list.concat({
                id: action.payload.id,
                name: action.payload.text,
                entered: false,
            }),
        }),
        [ENTER]: (state, action) => ({
            ...state,
            list: state.list.map(
                item =>
                    item.id === action.payload
                        ? { ...item, entered: !item.entered }
                        : item
            ),
        }),
        [LEAVE]: (state, action) => ({
            ...state,
            list: state.list.filter(item => item.id !== action.payload),
        }),
    },
    initialState
);