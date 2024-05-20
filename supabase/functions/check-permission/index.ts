import { Permit } from "npm:permitio";

const corsHeaders = {
  'Access-Control-Allow-Origin': "*",
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST',
}


Deno.serve(async (req) => {
  

  const { user , action , resource , context} = await req.json()

  const permit = new Permit({
    // your API Key
    token: Deno.env.get("PERMIT_TOKEN"),
    pdp: Deno.env.get("PDP_URL"),

  });

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  
  let response;

  try{

      const permitted = await permit.check( 
        
        //id of the user
        String(user),

        //action 
        String(action), 
        
        //resource
        {
          type: resource.type ,
          tenant: resource.tenant ,
        }, 
        
        //context
        context
      );

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