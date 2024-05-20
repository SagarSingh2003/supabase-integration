import { Permit } from "npm:permitio";

const corsHeaders = {
  'Access-Control-Allow-Origin': "*",
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST',
}

//getting user data from the body
//getting permit token also from the body 

Deno.serve(async (req) => {
  

  const { id , defaultRole , tenant } = await req.json()

  const permit = new Permit({
    
    token: Deno.env.get("PERMIT_TOKEN") ,
    pdp: Deno.env.get("PDP_URL"),

  });

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }



  const user = {
      key: id
  }


  const assignedRole = {
      role : defaultRole,
      tenant : tenant,
      user : id
  }

  let response ;
  
  try{
      await permit.api.createUser(user);
      const action = await permit.api.assignRole(JSON.stringify(assignedRole));
      
      response = {
        msg : `employee with ${defaultRole} role created successfully`
      }

      return new Response(JSON.stringify(response), { headers: corsHeaders  , status : 200})

  }catch(err){
      console.log(err);
      response = {
        error : err
      }

      return new Response(JSON.stringify(response), { headers: corsHeaders , status : 500})
  }

})