const fs = require("fs");


let users = [
    {
      name: "Rajneesh",
      age: 34,
      address: {
        local: "22 Alaknanda",
        city: "Dehradun",
        state: "UK",
      },
      orders: [{ id: 1, name: "GOT Book Series" }],
    },
    {
      name: "Bhavesh",
      age: 37,
      address: {
        local: "48 DT Row",
        city: "Hyderabad",
        state: "AP",
      },
    },
    {
      name: "Jasbir",
      age: 38,
      address: {
        local: "196 Lama Bhavan",
        city: "Gangtok",
        state: "Sikkim",
      },
      orders: [
        { id: 1, name: "Chair" },
        { id: 2, name: "PS5" },
      ],
    },
  ];
  console.log(
  JSON.stringify(
    updateUsers(users, {
      name: "Ravi",
      age: 24,
      address: {
        local: "25 Iroda",
        city: "Dehradun",
        state: "UK",
      },
    })
  )
);
  function updateUsers(users, userObject, item) {
        for(let i=0;i<users.length;i++){
            if(userObject.name==users[i].name){                
                //if order empty
                const hasOrders = "orders" in users[i];
                if(hasOrders){    
                    let object = { 
                        id: users[i].orders.length+1, 
                        name: item 
                    };
                    users[i].orders.push(object);
                }else{
                    let orders = [];
                    users[i]['orders'] = orders;
                    let object = { 
                        id: 1, 
                        name: item 
                    };
                    users[i].orders.push(object);
                }
                fs.writeFileSync("./orders.json", JSON.stringify(users));
                return users;
            }
    }
        //add user
        users.push(userObject);
        fs.writeFileSync("./orders.json", JSON.stringify(users));
        return users;
        
}
console.log(
    JSON.stringify(
      updateUsers(
        users,
        {
          name: "Rajneesh",
          age: 34,
          address: {
            local: "22 Alaknanda",
            city: "Dehradun",
            state: "UK",
          },
        },
        "GOT Book Series"
      )
    )
  );
  
  console.log(
    JSON.stringify(
      updateUsers(users, {
        name: "Ravi",
        age: 24,
        address: {
          local: "25 Iroda",
          city: "Dehradun",
          state: "UK",
        },
      })
    )
  );
  
  console.log(
    JSON.stringify(
      updateUsers(
        users,
        {
          name: "Ravi",
          age: 24,
          address: {
            local: "25 Iroda",
            city: "Dehradun",
            state: "UK",
          },
        },
        "Chair"
      )
    )
  );
  
  console.log(
    JSON.stringify(
      updateUsers(
        users,
        {
          name: "Rajneesh",
          age: 34,
          address: {
            local: "22 Alaknanda",
            city: "Dehradun",
            state: "UK",
          },
        },
        "Fan"
      )
    )
  );