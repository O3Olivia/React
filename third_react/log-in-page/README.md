# 👥 Introduction 
Simple <b>Login Form</b> 

# 👀  Initial Screen
<img width="643" src="https://user-images.githubusercontent.com/87024040/193744156-39931ed2-0e5c-4b06-acca-cab34b871b87.png">
<img width="643" src="https://user-images.githubusercontent.com/87024040/193744410-05fead9d-af9a-4c44-a245-76477463133e.png">



# 👾 Trouble shooting
### Issue 1 - [useReducer] 설정
#### 🚨 Situation
- useState를 useReducer로 코드를 변경시키고 난 후 이메일을 input창에 입력하고 비밀번호를 입력하기 위하여 input창을 클릭했을 때 undefined  에러가 발생하였다.

#### ⚠️ Cause
- useReducer를 처음 배우면서 return 부분 설정하는 부분의 흐름을 파악하기가 어려웠다.
특히, validation 설정을 위하여 emailChangeHandler와 validateEmailHandler을 따로 만들었다. 이때emailChangeHandler에는 type과 value를 설정하였는데, 이때 value의 이름을 val로 설정했다.
validateEmailHandler는 틀렸을 경우 나오는 부분이라 Value를 따로 설정하지 않았다. 
이 부분을 이해하지 못했다.

#### 💡 Solution
**[에러]**
```
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.val, isValid: state.val.includes("@") };
  }
  return { value: "", isValid: false };
};
```

**[해결방법]**
```
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
```
- 위 코드처럼 validation을 위한 "INPUT_BLUR" 부분에서 value: state.val과 isValid:state.val.include("@") 부분을 value:state.value, isValid:state.value로 변경하였다.
