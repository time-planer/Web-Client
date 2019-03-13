# TimePlaner.AuthenticationApi

All URIs are relative to *http://localhost:8080/time-planer*

Method | HTTP request | Description
------------- | ------------- | -------------
[**login**](AuthenticationApi.md#login) | **GET** /auth | Login
[**registrate**](AuthenticationApi.md#registrate) | **PUT** /auth | Registration


<a name="login"></a>
# **login**
> InlineResponse200 login(email, password)

Login

Here you authenticate as the user and get his API key

### Example
```javascript
var TimePlaner = require('time_planer');

var apiInstance = new TimePlaner.AuthenticationApi();
var email = null; // String | The Email Adress of the User
var password = "password_example"; // String | The Uses password
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.login(email, password, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **email** | [**String**](.md)| The Email Adress of the User | 
 **password** | **String**| The Uses password | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="registrate"></a>
# **registrate**
> SuccessResponse registrate(opts)

Registration

Registers a new user. ### Requirements * Name * Email * Password

### Example
```javascript
var TimePlaner = require('time_planer');

var apiInstance = new TimePlaner.AuthenticationApi();
var opts = {
  'registrationRequest': new TimePlaner.RegistrationRequest() // RegistrationRequest | 
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.registrate(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registrationRequest** | [**RegistrationRequest**](RegistrationRequest.md)|  | [optional] 

### Return type

[**SuccessResponse**](SuccessResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

