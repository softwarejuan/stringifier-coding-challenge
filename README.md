## Coding Challenge
Write a stringifier function for our "Membership Reporting Standard" (MRS).  

Parameters:  
`memberships` - a collection of membership objects.  
`max line length` - an optional int that indicates the "maximum line length".  
Value must be between 30 and 999. Defaults to 64.

Return Value:   
A string representing the membership objects in MRS text format.

## Notes

* Unless your interviewer says otherwise, you should use node.js to solve the challenge.  
* Work on the challenge like it's a real work project. 
* You are free to use search engines and external libraries as needed, but you can *not* use somebody else's solution.
* Use `diff`, the output of your program, and the provided `output.txt` to test your solution.
* We respect your time, so we ask that you please timebox this exercise to a *maximum* of 3 hours.
* Once you are done, create a secret gist and submit it to your interviewer. 

## About MRS

MRS is a CSV like text format for representing membership records.
* Fields are delimited by commas
* Null values are represented by an empty string
* The first field in a record identifies the record type
* Lines, including the last line, are terminated by carriage return and line feed (\r\n)

## Membership Record

|Order|Name|Length|Value or Format|Notes|
|-----|----|------|-----|-----|
|1|Record Type|2|16|Signifies the start of a membership record|
|2|Member ID|8||Membership reference number|
|3|Dues Date|6|YYMMDD|Due date for member's dues|
|4|Dues Amount|3-6|Numeric without decimals|Total dues amount in cents|
|5|Notes|Unbounded|Membership notes entered by support|UTF-8 encoded text|

## Examples:
In the examples, “\r” represents a “carriage control” and the “\n” represents a “line feed”.

Input:
```json
[{
  "notes": "Please update your credit card on file with HQ.",
  "renewal_date": "2022-08-15",
  "dues_amount": "125.99",
  "member_id": "00001234"
}]
```
Output when maximum line length is 80:
```
16,00001234,220815,12599,Please update your credit card on file with HQ.\r\n
```

Input:
```json
[{
  "notes": null,
  "renewal_date": "2022-08-01",
  "dues_amount": null,
  "member_id": "00004567"
}]
```
Output when maximum line length is 80:
```
16,00004567,220801,,\r\n
```

## Continuation Record
When the data in the membership record code exceeds the maximum line length,  
a continuation record is used to span a Membership Record across one or more lines.  
A continuation record may be continued by another continuation record if it exceed the max line length. 


Note: The end of record delimiter (\r\n) does not count towards the maximum line length.

|Order|Name|Length|Value or Format|Notes|
|-----|----|------|-----|-----|
|1|Record Type|2|88|Signifies the start of a continuation record|
|2|(Next Field)|Unbounded||A continuation of the preceding record|

## Examples
Input:
```json
[{
  "notes": "Please update your credit card on file with HQ.",
  "renewal_date": "2022-08-15",
  "dues_amount": "125.99",
  "member_id": "00001234"
}]
```
Output when maximum line length is 32:
```
16,00001234,220815,12599,Please \r\n
88,update your credit card on fi\r\n
88,le with HQ.\r\n
```

Input: 
```json
[{
  "notes": "Please update your credit card on file with HQ.",
  "renewal_date": "2022-08-15",
  "dues_amount": "125.99",
  "member_id": "00001234"
}, {
  "notes": "Dues amount includes late fees.",
  "renewal_date": "2021-08-15",
  "dues_amount": "250.00",
  "member_id": "00004567"
}]
```
Output when max line length is 80:
```
16,00001234,220815,12599,Please update your credit card on file with HQ.\r\n
16,00004567,210815,25000,Dues amount includes late fees.\r\n
```
Output when max line length is 30:
```
16,00001234,220815,12599,Pleas\r\n
88,e update your credit card o\r\n
88,n file with HQ.\r\n
16,00004567,210815,25000,Dues \r\n
88,amount includes late fees.\r\n
```