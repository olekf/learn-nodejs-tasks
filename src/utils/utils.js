export const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            return next();
        }
    };
};

const errorResponse = (schemaErrors) => {
    const errors = schemaErrors.map(error => {
        const { message } = error;
        return message;
    });

    return errors;
};
