# WayFarer
Created under the recommendation of Andela for Fellowship-Program Cycle 9

# UI architecture
The App comprises of Graphical User Interfaces - GUIs, which are ;

1. A WELCOME-page and more Introductive to the user who just visited. The page also has update-infos panel regarding<br>
   the available services and products and any other relevant information from the service-provider.
   
2. A SIGNIN-page, which is a page where an already user or client or administrator can login into their accounts using 
   a signed-email adress and a signed-password.
   
3. A SIGNUP-page, which is where interested-visitor/user can create an account, later that'll be used to acquire services and 
   products available on the platform, which are tripping-services.
   
4. A page where the authenticated and logged in user can edit private tripping-schedules, book a seat on an available 
   trip-service. Also should be able to view either user or company trip schedule in a filtered way, for example by date, 
   trip ID,..
   
5. Also, an admin-user should be able log in and out through the same pages as the client user.
6. In addition to the admin-privilege, the admin-user should be able to create a trip and cancel a trip. And all users that 
   made reservation or booked on the very same trip, should get a trip-status-update
   
7. Any user should be able to edit his or her profile, generally make some changes to his or her account via an account view.

## wayfarer API
wayfarer API is a transport reservation simulation that provide the clients with the possiblities to signup to the web API and sign in and make some reservations based on the available trips posted by the web managers.
## warfarer API root [/]
wayfarer root is a welcoming page or an introductory page which from the visitor can be directed to different pages to register, to seek help, to view offered services and ask for guidance.
