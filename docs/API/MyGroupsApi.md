# TimePlaner.MyGroupsApi

All URIs are relative to *http://localhost:8080/time-planer*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createGroup**](MyGroupsApi.md#createGroup) | **POST** /user/{username}/mygroups/ | Create a group
[**deleteGroup**](MyGroupsApi.md#deleteGroup) | **DELETE** /user/{username}/mygroup/{group_UUID} | Remove Group
[**editGroup**](MyGroupsApi.md#editGroup) | **PATCH** /user/{username}/mygroup/{group_UUID} | Edit Group
[**getOwnedGroup**](MyGroupsApi.md#getOwnedGroup) | **GET** /user/{username}/mygroup/{group_UUID} | Get detailed information
[**getOwnedGroups**](MyGroupsApi.md#getOwnedGroups) | **GET** /user/{username}/mygroups/ | Get all created groups


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

var apiInstance = new TimePlaner.MyGroupsApi();
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
 **initialGroup** | [**InitialGroup**](../DataTypes/InitialGroup.md)|  | [optional] 

### Return type

[**Group**](../DataTypes/Group.md)

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

var apiInstance = new TimePlaner.MyGroupsApi();
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

[**Group**](../DataTypes/Group.md)

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

var apiInstance = new TimePlaner.MyGroupsApi();
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
 **editGroup** | [**EditGroup**](../DataTypes/EditGroup.md)| The edit information  You also can only edit a few values or none, all parameters are optional | [optional] 

### Return type

[**Group**](../DataTypes/Group.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: application/json
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

var apiInstance = new TimePlaner.MyGroupsApi();
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

[**Group**](../DataTypes/Group.md)

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

var apiInstance = new TimePlaner.MyGroupsApi();
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

[**[ReducedGroup]**](../DataTypes/ReducedGroup.md)

### Authorization

[User_Key](../README.md#User_Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

