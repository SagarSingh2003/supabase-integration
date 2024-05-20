### endpoints : 

1 )

- Req : Post ,
- action : creates a user in the permit directory
- url : https://asnvuyznngsplkniggui.supabase.co/functions/v1/createUser
- Body:
```
  {
    id : "user id that will be used to uniquely identify the user"
    defaultRole : "the default role that the users will be assigned like Admin or Employee or Viewer",
    tenant : "the tenant under which the user will be added",
  }
```

- example :
  ![image](https://github.com/SagarSingh2003/supabase-integration/assets/129133613/9d5537be-1a23-4ecd-9824-e3128dbb006d)



2 )   

- Req : Post ,
- action : checks for user permissions in permit 
- url : https://asnvuyznngsplkniggui.supabase.co/functions/v1/check-permission,
- Body :
  ```
  {
    user : "user id that will be used to uniquely identify the user",
    action: "operation which the user wants to perform",
    resource: {
      type: "type or resource name",
      teanant : "tenant name under which the user exists "
    }
    context: "extra information"
  }
  ```
- example :
  ![image](https://github.com/SagarSingh2003/supabase-integration/assets/129133613/4bcf4bdd-0a78-45b3-831f-3c3dc6e4d29c)


