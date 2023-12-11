export type InitValidationStateType = {
  name: boolean;
  email: boolean;
  passwordSecure: boolean;
  passwordMatch: boolean;
};

export type VaildataionStateActions = {
  payload: boolean;
  type: "name" | "email" | "passwordSecure" | "passwordMatch" | "reset";
};

export const vaildationInitState: InitValidationStateType = {
  name: true,
  email: true,
  passwordSecure: true,
  passwordMatch: true,
};

export function validationReducer(
  state: InitValidationStateType,
  action: VaildataionStateActions
) {
  switch (action.type) {
    case "name": {
      const copy = { ...state };
      copy.name = action.payload;
      return copy;
    }
    case "email": {
      const copy = { ...state };
      copy.email = action.payload;
      return copy;
    }
    case "passwordSecure": {
      const copy = { ...state };
      copy.passwordSecure = action.payload;
      return copy;
    }
    case "passwordMatch": {
      const copy = { ...state };
      copy.passwordMatch = action.payload;
      return copy;
    }
    default:
      return { ...vaildationInitState };
  }
}
