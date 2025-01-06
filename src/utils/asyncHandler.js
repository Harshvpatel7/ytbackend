// const asyncHandler = (fun) => async(req, res, next)=>{
//     try{
//         fun(req, res, next);
//     }catch(error){
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message,
//         })
        
//     }
// }

const asyncHandler = (reqHandler) => async(req, res, next)=>{
    Promise.resolve(reqHandler(req,res,next))
    .catch((err) => next(err));
};

export {asyncHandler};