
  const getLogObject = (user_id,moule_name,path,method,function_name,tag,message) => {
    return {
      user_id:user_id,
      module_name:moule_name,
      path:path,
      method:method,
      function:function_name,
      tag:tag,
      message: message
    }
  }
  
    const getLogErrorObject = (user_id,moule_name,path,method,function_name,tag,message,error) => {
    return {
        user_id:user_id,
        module_name:moule_name,
        path:path,
        method:method,
        function:function_name,
        tag:tag,
        message: message,
        error: error
    }
  }
  
  module.exports = {
    getLogObject,
    getLogErrorObject
  };
  
 