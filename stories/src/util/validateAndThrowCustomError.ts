import { validate } from "class-validator";

// This is a function that works as a substitute of NestJs' validation pipe
export async function validateAndThrowCustomError(
    story: Object,
    aditionalErrorMessages: string[] = []
) {

    const validationResult = await validate(story);

    if (validationResult.length || aditionalErrorMessages.length) {
        const errorMessages = aditionalErrorMessages.concat(
            validationResult.map(
                (validationError) =>
                    Object.values(
                        validationError.constraints || {
                            UndefinedValidation: "Undefined validation error message",
                        }
                    )[0]
            )
        );
        throw new Error(JSON.stringify(errorMessages));
    }
}
