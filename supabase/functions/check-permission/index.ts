import { Permit } from "npm:permitio";

const corsHeaders = {
  'Access-Control-Allow-Origin': "*",
  'Access-Control-Allow-Headers': 'Authorization, x-client-info, apikey, Content-Type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}

Deno.serve(async (req) => {
  

  const { id , operation , resource , tenant  , permit_token} = await req.json()

  const permit = new Permit({
    // your API Key
    token: permit_token,
    pdp: "https://cloudpdp.api.permit.io",

  });

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  
  let response;

  try{

      const permitted = await permit.check( String(id) , String(operation) , {
          type: resource ,
          tenant: tenant ,
        });

      console.log(permitted);

      if (permitted) {
          
        response = {
            "status" : "permitted"
        }

      } else {
          
          response = {
              "status" : "not-permitted"
          }
      }

      return new Response(JSON.stringify(response), { headers:  corsHeaders  , status :  200 })
    }catch(err){
      
      console.log(err);
      response = {
          "problem": "internal server error",
          "error" : err
      }

      return new Response(JSON.stringify(response), { headers:  corsHeaders , status :  500 })
  }
})