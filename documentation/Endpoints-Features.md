Table of Contents
- [Overview](#overview)
- [Querying with specific fields](#querying-with-specific-fields)
### Overview
Some endpoints supports some features which allows them to change their behavior according to some parameters
### Querying with specific fields
Any endpoint that supports this feature, by setting the URI parameter `fields` to comma separated field names, will make the endpoint to return only these fields of it's object result (or of each object of it's result if it returns an array), If the response consists of array of objects and only one field name provided, an array of this field will be returned instead of an array of a single property. 

If only one field is selected and the endpoint limits its results by pagination the endpoint results limit will be expanded to 10x of the original limit, you can still use the original limit if you set the parameter `same_limit=true`.