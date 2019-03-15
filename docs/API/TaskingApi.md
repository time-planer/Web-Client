# TimePlaner.TaskingApi

All URIs are relative to *http://localhost:8080/time-planer*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addGroupTask**](TaskingApi.md#addGroupTask) | **POST** /user/{username}/group/{group_UUID}/tasks | Add Group Task
[**addTask**](TaskingApi.md#addTask) | **POST** /user/{username}/tasks | Add Task
[**deleteGroupTask**](TaskingApi.md#deleteGroupTask) | **DELETE** /user/{username}/group/{group_UUID}/task/{task} | Delete Group Task
[**deleteTask**](TaskingApi.md#deleteTask) | **DELETE** /user/{username}/task/{task} | 
[**editGroupTask**](TaskingApi.md#editGroupTask) | **PATCH** /user/{username}/group/{group_UUID}/task/{task} | Edit Group Task
[**editTask**](TaskingApi.md#editTask) | **PATCH** /user/{username}/task/{task} | 
[**getAllGroupTasks**](TaskingApi.md#getAllGroupTasks) | **GET** /user/{username}/group/{group_UUID}/tasks | Get All Group Tasks
[**getAllTasks**](TaskingApi.md#getAllTasks) | **GET** /user/{username}/tasks | Get All Tasks
[**getGroupTask**](TaskingApi.md#getGroupTask) | **GET** /user/{username}/group/{group_UUID}/task/{task} | Get Group Task Information
[**getTask**](TaskingApi.md#getTask) | **GET** /user/{username}/task/{task} | 
[**removeAllGroupTasks**](TaskingApi.md#removeAllGroupTasks) | **DELETE** /user/{username}/group/{group_UUID}/tasks | Remove All Group Tasks
[**removeAllTasks**](TaskingApi.md#removeAllTasks) | **DELETE** /user/{username}/tasks | Remove All Tasks


<a name="addGroupTask"></a>
# **addGroupTask**
> Task addGroupTask(username, groupUUID, opts)

Add Group Task

Adds a task to the users storage

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.TaskingApi();
var username = "username_example"; // String | The users name
var groupUUID = "groupUUID_example"; // String | The UUID of the group to operate with
var opts = {
  'initialTask': new TimePlaner.InitialTask() // InitialTask | 
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.addGroupTask(username, groupUUID, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **groupUUID** | **String**| The UUID of the group to operate with | 
 **initialTask** | [**InitialTask**](../DataTypes/InitialTask.md)|  | [optional] 

### Return type

[**Task**](../DataTypes/Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="addTask"></a>
# **addTask**
> Task addTask(username, opts)

Add Task

Adds a task to the users storage

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.TaskingApi();
var username = "username_example"; // String | The users name
var opts = {
  'initialTask': new TimePlaner.InitialTask() // InitialTask | 
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.addTask(username, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **initialTask** | [**InitialTask**](../DataTypes/InitialTask.md)|  | [optional] 

### Return type

[**Task**](../DataTypes/Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteGroupTask"></a>
# **deleteGroupTask**
> Task deleteGroupTask(username, task, groupUUID)

Delete Group Task

Deletes the task

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.TaskingApi();
var username = "username_example"; // String | The users name
var task = "task_example"; // String | The name of the task to edit delte or get detailed information
var groupUUID = "groupUUID_example"; // String | The UUID of the group to operate with
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteGroupTask(username, task, groupUUID, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **task** | **String**| The name of the task to edit delte or get detailed information | 
 **groupUUID** | **String**| The UUID of the group to operate with | 

### Return type

[**Task**](../DataTypes/Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteTask"></a>
# **deleteTask**
> Task deleteTask(username, task)



Deletes the task

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.TaskingApi();
var username = "username_example"; // String | The users name
var task = "task_example"; // String | The name of the task to edit delte or get detailed information
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteTask(username, task, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **task** | **String**| The name of the task to edit delte or get detailed information | 

### Return type

[**Task**](../DataTypes/Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="editGroupTask"></a>
# **editGroupTask**
> Task editGroupTask(username, task, groupUUID, opts)

Edit Group Task

Edit the Task

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.TaskingApi();
var username = "username_example"; // String | The users name
var task = "task_example"; // String | The name of the task to edit delte or get detailed information
var groupUUID = "groupUUID_example"; // String | The UUID of the group to operate with
var opts = {
  'editTask': new TimePlaner.EditTask() // EditTask | Only need to enter the values to edit
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.editGroupTask(username, task, groupUUID, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **task** | **String**| The name of the task to edit delte or get detailed information | 
 **groupUUID** | **String**| The UUID of the group to operate with | 
 **editTask** | [**EditTask**](../DataTypes/EditTask.md)| Only need to enter the values to edit | [optional] 

### Return type

[**Task**](../DataTypes/Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="editTask"></a>
# **editTask**
> Task editTask(username, task, opts)



Edit the Task

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.TaskingApi();
var username = "username_example"; // String | The users name
var task = "task_example"; // String | The name of the task to edit delte or get detailed information
var opts = {
  'editTask': new TimePlaner.EditTask() // EditTask | Only need to enter the values to edit
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.editTask(username, task, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **task** | **String**| The name of the task to edit delte or get detailed information | 
 **editTask** | [**EditTask**](../DataTypes/EditTask.md)| Only need to enter the values to edit | [optional] 

### Return type

[**Task**](../DataTypes/Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getAllGroupTasks"></a>
# **getAllGroupTasks**
> [Task] getAllGroupTasks(username, groupUUID)

Get All Group Tasks

Fetch the users tasks

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.TaskingApi();
var username = "username_example"; // String | The users name
var groupUUID = "groupUUID_example"; // String | The UUID of the group to operate with
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getAllGroupTasks(username, groupUUID, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **groupUUID** | **String**| The UUID of the group to operate with | 

### Return type

[**[Task]**](../DataTypes/Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getAllTasks"></a>
# **getAllTasks**
> [Task] getAllTasks(username)

Get All Tasks

Fetch the users tasks

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.TaskingApi();
var username = "username_example"; // String | The users name
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getAllTasks(username, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 

### Return type

[**[Task]**](../DataTypes/Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getGroupTask"></a>
# **getGroupTask**
> Task getGroupTask(username, task, groupUUID)

Get Group Task Information

get detailed information about the task

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.TaskingApi();
var username = "username_example"; // String | The users name
var task = "task_example"; // String | The name of the task to edit delte or get detailed information
var groupUUID = "groupUUID_example"; // String | The UUID of the group to operate with
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getGroupTask(username, task, groupUUID, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **task** | **String**| The name of the task to edit delte or get detailed information | 
 **groupUUID** | **String**| The UUID of the group to operate with | 

### Return type

[**Task**](../DataTypes/Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getTask"></a>
# **getTask**
> Task getTask(username, task)



get detailed information about the task

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.TaskingApi();
var username = "username_example"; // String | The users name
var task = "task_example"; // String | The name of the task to edit delte or get detailed information
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getTask(username, task, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **task** | **String**| The name of the task to edit delte or get detailed information | 

### Return type

[**Task**](../DataTypes/Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="removeAllGroupTasks"></a>
# **removeAllGroupTasks**
> SuccessResponse removeAllGroupTasks(username, groupUUID)

Remove All Group Tasks

Deletes all Tasks

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.TaskingApi();
var username = "username_example"; // String | The users name
var groupUUID = "groupUUID_example"; // String | The UUID of the group to operate with
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.removeAllGroupTasks(username, groupUUID, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **groupUUID** | **String**| The UUID of the group to operate with | 

### Return type

[**SuccessResponse**](../DataTypes/SuccessResponse.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="removeAllTasks"></a>
# **removeAllTasks**
> SuccessResponse removeAllTasks(username)

Remove All Tasks

Deletes all Tasks

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.TaskingApi();
var username = "username_example"; // String | The users name
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.removeAllTasks(username, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 

### Return type

[**SuccessResponse**](../DataTypes/SuccessResponse.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

