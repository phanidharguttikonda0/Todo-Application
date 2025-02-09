npm install nativewind
npm install tailwindcss
npx tailwindcss init
expo r -c  # Reset Metro Bundler with cache clear
yarn start --tunnel
---------------------------------
-> npm install react-native-toast-message # works both on andriod and ios
if we want to use toast for messaging responses we can toast messsage by installing it

Tommarow we need to learn about payload and make instead taking full curent todos we will take only some like ids title

Now i need to change the back end and allow only title and the status and id to be returned in one request and for the 
and when clicked on detail we can go for fetching the data and when clicked on a particular todo , we will again fetch
for the detailed discription and time of the todo

-> when user starts the todo , then that task will be sent to the first of the list, we will do it in the server side
it self, when it's completed we are going to remove from the current todos and add to the completed todos

----------------------------------------
server responses for each request :

-> add-todo : returns the todo document
-> start-todo : return the start time
-> mark-as-done : return the end time
-> current-todos : return an object with doing todos and pending todos array
[ as we render the doing todos first and then pending todos]
-> todo/:todoId -> returns the startTime, endTime and description
-> completed-todos : returns the title of the todos as status was any ways done only
-> delete-todo/:todoId : returns true or false , if true then we are gonna remove from the state 
-> update-todo/:todoId :  return true or false , if true we will add the new title and description
[ only the pending status todo's will be updated]


------------------------------------------
dependencies :
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons @react-native-masked-view/masked-view

npm install @react-navigation/native   
npm install @react-navigation/stack
npm install @react-navigation/bottom-tabs
npm install @expo/vector-icons   
npm install --save-dev metro-react-native-babel-preset  [ used for tailwind purpose]
npm install --save-dev @babel/plugin-transform-private-methods
npm install axios
npm install expo-secure-store
npm install zod