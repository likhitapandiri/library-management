const validateRequest = (schema,source = "body") =>{
    return (req,res,next) =>{
        console.log("Schema:", schema);
        console.log("Body:", req[source]);
        const result = schema.safeParse(req[source]);
        if(!result.success){
             return res.status(400).json({
               success: false,
               errors: result.error.issues,
             });
        }
        req[source] = result.data;

        next();
    }
}

export default validateRequest;