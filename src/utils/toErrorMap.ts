import { FieldError } from "../generated/graphql";

export const toErrorMap=(errors:FieldError[])=>{
    const errorMap: Record<string, string>={};
    errors.forEach(({field,message})=>{ //field n msg r destrctured from FieldError
        errorMap[field]=message;
    });
    return errorMap;
}