'use client';
import type { FieldType, FieldValueMap, ValidationArg } from '@/libs/utils/createGathering';
import { validationInput } from '@/libs/utils/createGathering';
import { useCallback, useMemo, useReducer } from 'react';
import PostInput from './components/PostInput';

export interface CreateGatheringForm {
  title: string;
  inquiry: string;
  category: string;
  image: File | null;
}

const initialForm: CreateGatheringForm = {
  title: '',
  inquiry: '',
  category: '',
  image: null,
};

type State = {
  form: CreateGatheringForm;
  errors: Partial<Record<FieldType, string>>;
};

const initialState: State = {
  form: initialForm,
  errors: {},
};

type Action =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_FORM'; patch: Partial<CreateGatheringForm> }
  | { type: 'SET_ERROR'; field: FieldType; message: string | null }
  | { type: 'SET_ADDRESS_STATUS'; loading: boolean; error: string | null }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FORM':
      return { ...state, form: { ...state.form, ...action.patch } };

    case 'SET_ERROR': {
      const next = { ...state.errors };
      if (!action.message) delete next[action.field];
      else next[action.field] = action.message;
      return { ...state, errors: next };
    }
    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

type CommitFieldFn = <K extends FieldType>(fieldType: K, value: FieldValueMap[K]) => boolean;

export default function InquiryPost() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors } = state;

  const setField = useCallback(
    <K extends keyof CreateGatheringForm>(field: K, value: CreateGatheringForm[K]) => {
      dispatch({ type: 'SET_FORM', patch: { [field]: value } as Partial<CreateGatheringForm> });
    },
    [],
  );

  const commitField: CommitFieldFn = useCallback((fieldType, value) => {
    const msg = validationInput({ type: fieldType, value } as ValidationArg);
    dispatch({ type: 'SET_ERROR', field: fieldType, message: msg });

    if (msg) return false;

    return true;
  }, []);

  const canNext = useMemo(
    () => Boolean(form.title && form.category && form.inquiry),
    [form.title, form.category, form.inquiry],
  );

  return (
    <>
      <div className="h-screen px-3.75 pb-5">
        <PostInput
          form={form}
          errors={errors}
          setField={setField}
          commitField={commitField}
          canNext={canNext}
        />
      </div>
    </>
  );
}
