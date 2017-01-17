# eval-uator-
Eval-uator allows you to create the dynamic alerts that you’ve always wanted. What is it? It’s a simple Node Service that can run tiny scripts (that you can create in the browser). 

It’s

main purpose is to query Insights and trigger alerts off of many queries.

  

For example

  

1. Query Insights and run some calculation to trigger a failure (“Conditional Baselining”) 
2. Check if a string value exists in some attribute of an Event (“Does a process with X arguments stop reporting?”) 
  

You can set up Custom Metric Alerts for each script as such:

  

Custom/Failure/{file_name} - call_count.

  

So if it fails once, or many times, trigger 

alert.

  

Future goals:

1. Template scripts so you don’t have to start from scratch 
2. Better UI