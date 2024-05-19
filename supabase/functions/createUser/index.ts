import { Permit } from "npm:permitio";

const corsHeaders = {
  'Access-Control-Allow-Origin': "*",
  'Access-Control-Allow-Headers': 'Authorization, x-client-info, apikey, Content-Type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}

//getting user data from the body
//getting permit token also from the body 

Deno.serve(async (req) => {
  

  const { id , defaultRole , tenant , permit_token} = await req.json()

  const permit = new Permit({
    // your API Key
    // Deno.env.get("PERMIT_TOKEN")

    token: permit_token,
    pdp: "https://cloudpdp.api.permit.io",

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