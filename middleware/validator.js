const validateRequest = (schema,source = "body") =>{
    return (req,res,next) =>{
        console.log("Schema:", schema);
        console.log("Body:", req[source]);
        const result = schema.safeParse(req[source]);
        if(!result.success){
            const errors = {};

            result.error.issues.forEach((issue) => {
              errors[issue.path[0]] = issue.message;
            });

            return res.status(400).json({
              success: false,
              errors,
            });
        }
        req[source] = result.data;

        next();
    }
}

export default validateRequest;