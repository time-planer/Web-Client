# TimePlaner.MemberingGroupsApi

All URIs are relative to *http://localhost:8080/time-planer*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addGroupTask**](MemberingGroupsApi.md#addGroupTask) | **POST** /user/{username}/group/{group_UUID}/tasks | Add Group Task
[**deleteGroupTask**](MemberingGroupsApi.md#deleteGroupTask) | **DELETE** /user/{username}/group/{group_UUID}/task/{task} | Delete Group Task
[**editGroupTask**](MemberingGroupsApi.md#editGroupTask) | **PATCH** /user/{username}/group/{group_UUID}/task/{task} | Edit Group Task
[**getAllGroupTasks**](MemberingGroupsApi.md#getAllGroupTasks) | **GET** /user/{username}/group/{group_UUID}/tasks | Get All Group Tasks
[**getGroup**](MemberingGroupsApi.md#getGroup) | **GET** /user/{username}/group/{group_UUID} | Get Group Task informations
[**getGroupTask**](MemberingGroupsApi.md#getGroupTask) | **GET** /user/{username}/group/{group_UUID}/task/{task} | Get Group Task Information
[**getGroups**](MemberingGroupsApi.md#getGroups) | **GET** /user/{username}/groups/ | Get all membered groups
[**removeAllGroupTasks**](MemberingGroupsApi.md#removeAllGroupTasks) | **DELETE** /user/{username}/group/{group_UUID}/tasks | Remove All Group Tasks


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

var apiInstance = new TimePlaner.MemberingGroupsApi();
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

var apiInstance = new TimePlaner.MemberingGroupsApi();
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

var apiInstance = new TimePlaner.MemberingGroupsApi();
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

var apiInstance = new TimePlaner.MemberingGroupsApi();
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

var apiInstance = new TimePlaner.MemberingGroupsApi();
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

var apiInstance = new TimePlaner.MemberingGroupsApi();
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

var apiInstance = new TimePlaner.MemberingGroupsApi();
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

var apiInstance = new TimePlaner.MemberingGroupsApi();
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

