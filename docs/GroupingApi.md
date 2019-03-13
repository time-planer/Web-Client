# TimePlaner.GroupingApi

All URIs are relative to *http://localhost:8080/time-planer*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addGroupTask**](GroupingApi.md#addGroupTask) | **POST** /user/{username}/group/{group_UUID}/tasks | Add Group Task
[**createGroup**](GroupingApi.md#createGroup) | **POST** /user/{username}/mygroups/ | Create a group
[**deleteGroup**](GroupingApi.md#deleteGroup) | **DELETE** /user/{username}/mygroup/{group_UUID} | Remove Group
[**deleteGroupTask**](GroupingApi.md#deleteGroupTask) | **DELETE** /user/{username}/group/{group_UUID}/task/{task} | Delete Group Task
[**editGroup**](GroupingApi.md#editGroup) | **PATCH** /user/{username}/mygroup/{group_UUID} | Edit Group
[**editGroupTask**](GroupingApi.md#editGroupTask) | **PATCH** /user/{username}/group/{group_UUID}/task/{task} | Edit Group Task
[**getAllGroupTasks**](GroupingApi.md#getAllGroupTasks) | **GET** /user/{username}/group/{group_UUID}/tasks | Get All Group Tasks
[**getGroup**](GroupingApi.md#getGroup) | **GET** /user/{username}/group/{group_UUID} | Get Group Task informations
[**getGroupTask**](GroupingApi.md#getGroupTask) | **GET** /user/{username}/group/{group_UUID}/task/{task} | Get Group Task Information
[**getGroups**](GroupingApi.md#getGroups) | **GET** /user/{username}/groups/ | Get all membered groups
[**getOwnedGroup**](GroupingApi.md#getOwnedGroup) | **GET** /user/{username}/mygroup/{group_UUID} | Get detailed information
[**getOwnedGroups**](GroupingApi.md#getOwnedGroups) | **GET** /user/{username}/mygroups/ | Get all created groups
[**removeAllGroupTasks**](GroupingApi.md#removeAllGroupTasks) | **DELETE** /user/{username}/group/{group_UUID}/tasks | Remove All Group Tasks


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

var apiInstance = new TimePlaner.GroupingApi();
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
 **initialTask** | [**InitialTask**](InitialTask.md)|  | [optional] 

### Return type

[**Task**](Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createGroup"></a>
# **createGroup**
> Group createGroup(username, opts)

Create a group

Here you can create an group

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.GroupingApi();
var username = "username_example"; // String | The users name
var opts = {
  'initialGroup': new TimePlaner.InitialGroup() // InitialGroup | 
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createGroup(username, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **initialGroup** | [**InitialGroup**](InitialGroup.md)|  | [optional] 

### Return type

[**Group**](Group.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteGroup"></a>
# **deleteGroup**
> Group deleteGroup(username, groupUUID)

Remove Group

Deletes the group, as all tasks within

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.GroupingApi();
var username = "username_example"; // String | The users name
var groupUUID = "groupUUID_example"; // String | The UUID of the group to operate with
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteGroup(username, groupUUID, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **groupUUID** | **String**| The UUID of the group to operate with | 

### Return type

[**Group**](Group.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
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

var apiInstance = new TimePlaner.GroupingApi();
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

[**Task**](Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="editGroup"></a>
# **editGroup**
> Group editGroup(username, groupUUID, opts)

Edit Group

Edit some values of a Group.

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.GroupingApi();
var username = "username_example"; // String | The users name
var groupUUID = "groupUUID_example"; // String | The UUID of the group to operate with
var opts = {
  'editGroup': new TimePlaner.EditGroup() // EditGroup | The edit information  You also can only edit a few values or none, all parameters are optional
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.editGroup(username, groupUUID, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **groupUUID** | **String**| The UUID of the group to operate with | 
 **editGroup** | [**EditGroup**](EditGroup.md)| The edit information  You also can only edit a few values or none, all parameters are optional | [optional] 

### Return type

[**Group**](Group.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: application/json
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

var apiInstance = new TimePlaner.GroupingApi();
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
 **editTask** | [**EditTask**](EditTask.md)| Only need to enter the values to edit | [optional] 

### Return type

[**Task**](Task.md)

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

var apiInstance = new TimePlaner.GroupingApi();
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

[**[Task]**](Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getGroup"></a>
# **getGroup**
> ReducedGroup getGroup(username, groupUUID)

Get Group Task informations

Get information about a group

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.GroupingApi();
var username = "username_example"; // String | The users name
var groupUUID = "groupUUID_example"; // String | The UUID of the group to operate with
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getGroup(username, groupUUID, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **groupUUID** | **String**| The UUID of the group to operate with | 

### Return type

[**ReducedGroup**](ReducedGroup.md)

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

var apiInstance = new TimePlaner.GroupingApi();
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

[**Task**](Task.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getGroups"></a>
# **getGroups**
> [ReducedGroup] getGroups(username)

Get all membered groups

Here you can get all groups where you are a member

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.GroupingApi();
var username = "username_example"; // String | The users name
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getGroups(username, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 

### Return type

[**[ReducedGroup]**](ReducedGroup.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getOwnedGroup"></a>
# **getOwnedGroup**
> Group getOwnedGroup(username, groupUUID)

Get detailed information

Get detailed information about a group

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.GroupingApi();
var username = "username_example"; // String | The users name
var groupUUID = "groupUUID_example"; // String | The UUID of the group to operate with
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getOwnedGroup(username, groupUUID, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 
 **groupUUID** | **String**| The UUID of the group to operate with | 

### Return type

[**Group**](Group.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getOwnedGroups"></a>
# **getOwnedGroups**
> [ReducedGroup] getOwnedGroups(username)

Get all created groups

Here you can get all groups which the user owns

### Example
```javascript
var TimePlaner = require('time_planer');
var defaultClient = TimePlaner.ApiClient.instance;
// Configure API key authorization: User_Key
var User_Key = defaultClient.authentications['User_Key'];
User_Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//User_Key.apiKeyPrefix = 'Token';

var apiInstance = new TimePlaner.GroupingApi();
var username = "username_example"; // String | The users name
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getOwnedGroups(username, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The users name | 

### Return type

[**[ReducedGroup]**](ReducedGroup.md)

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

var apiInstance = new TimePlaner.GroupingApi();
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

[**SuccessResponse**](SuccessResponse.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

