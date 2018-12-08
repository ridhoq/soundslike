# soundslike - API documentation
Learn how to use the soundslike API!

First. for the sake of this, im going to use soundslike.com as the url, however localhost:8888 might be the url if you're using docker 

## Section 1. Authentication 

### Getting auth token from api

run 'GET' http://soundslike.com/api/token with a username and password with basic AUTH  

this will return a response of...
```json
    {
        "expiration": 3000,
        "token": "token_string"
    }
``` 
you'll need to Base64 encode the bearer token provided earlier and include it in all API requests, except user creation 

## Section 2. Users 

### creating a new user 

run 'POST' http://soundslike.com/api/users/

with a application/json body of...
```json
{
    "username" : "test", 
    "email" : "test@gmail.com", 
    "password": "test"
}
``` 
and this will return a response of... 
```json
{
    "email": "test@gmail.com",
    "member_since": "Fri, 07 Dec 2018 06:19:28 GMT",
    "username": "test"
}
``` 
### getting a user 

run 'GET' http://soundslike.com/api/users/method_man with no body and this will return a response of...
```json
{
    "email": "method_man@wutang.com",
    "member_since": "Fri, 07 Dec 2018 06:19:28 GMT",
    "username": "method_man"
}
``` 
NOTE: the email field is not guranteed unless you're accessing your own profile

## Section 3. Songs 

### getting a song

run 'GET' http://soundslike.com/api/songs/2 with no body and this will return a response of...
```json
{
  "artist": "Wartime Afternoon",
  "created": "Thu, 06 Dec 2018 04:18:33 GMT",
  "created_by": {
    "email": "wartimeafternoon@gmail.com",
    "member_since": "Tue, 04 Dec 2018 05:06:48 GMT",
    "username": "wartimeafternoon"
  },
  "id": 2,
  "title": "Marjik Janson",
  "url": "https://www.youtube.com/watch?v=SUpV91yo1-M"
}
``` 

### posting a song

run 'POST' http://soundslike.com/api/songs/ with a body of 
```json
{
    "title" : "Feel It Still",
    "artist" : "Portugal, The Man",
    "url" : "https://www.youtube.com/watch?v=pBkHHoOIIn8"
}
``` 
and this will return a response of...
```json
{
  "artist": "Portugal, The Man",
  "created": "Thu, 06 Dec 2018 04:25:37 GMT",
  "created_by": {
    "email": "wartimeafternoon@gmail.com",
    "member_since": "Tue, 04 Dec 2018 05:06:48 GMT",
    "username": "wartimeafternoon"
  },
  "id": 3,
  "title": "Feel It Still",
  "url": "https://www.youtube.com/watch?v=pBkHHoOIIn8"
}
``` 

## Section 4. Song Relations

### getting a song relation

(this will surely be changed in the future, we will update then)

run 'GET' http://soundslike.com/api/songs/2/related with no body and this will return a response of an array of songs and their votes
```json
[
  {
    "artist": "Portugal, The Man",
    "created": "Thu, 06 Dec 2018 04:25:37 GMT",
    "id": 3,
    "title": "Feel It Still",
    "url": "https://www.youtube.com/watch?v=pBkHHoOIIn8",
    "user_id": 6,
    "vote_count": 1
  }
]
``` 

### creating a new song relation 

run 'POST' http://soundslike.com/api/song_relations/ with a body of...
```json
{
    "song1_id" : "3",
    "song2_id" : "2"
}
``` 
and get a response of..
```json
{
  "created": "Sat, 08 Dec 2018 01:45:13 GMT",
  "created_by": {
    "email": "nickerino@yahoo.com",
    "member_since": "Thu, 06 Dec 2018 03:29:28 GMT",
    "username": "nickerino"
  },
  "has_voted": true,
  "id": 2,
  "song1": {
    "artist": "Portugal, The Man",
    "created": "Thu, 06 Dec 2018 04:25:37 GMT",
    "created_by": {
      "email": "wartimeafternoon@gmail.com.com",
      "member_since": "Tue, 04 Dec 2018 05:06:48 GMT",
      "username": "wartimeafternoon"
    },
    "id": 3,
    "title": "Feel It Still",
    "url": "https://www.youtube.com/watch?v=pBkHHoOIIn8"
  },
  "song2": {
    "artist": "Codeine",
    "created": "Sat, 08 Dec 2018 01:44:48 GMT",
    "created_by": {
      "email": "balls@yahoo.com",
      "member_since": "Thu, 06 Dec 2018 03:29:28 GMT",
      "username": "nickerino"
    },
    "id": 4,
    "title": "Pickup Song",
    "url": "https://www.youtube.com/watch?v=YsmvzBYo7Bc"
  },
  "vote_count": 1
}
``` 

### voting on a song

run 'POST' https://soundslike.com/song_relations/2/vote

then you get a a response of 
```json
{
  "created": "Thu, 06 Dec 2018 04:29:39 GMT",
  "created_by": {
    "email": "nytxm@yahoo.com",
    "member_since": "Tue, 04 Dec 2018 05:06:48 GMT",
    "username": "nkhandker"
  },
  "has_voted": true,
  "id": 1,
  "song1": {
    "artist": "Wartime Afternoon",
    "created": "Thu, 06 Dec 2018 04:18:33 GMT",
    "created_by": {
      "email": "nytxm@yahoo.com",
      "member_since": "Tue, 04 Dec 2018 05:06:48 GMT",
      "username": "nkhandker"
    },
    "id": 2,
    "title": "Marjik Janson",
    "url": "https://www.youtube.com/watch?v=SUpV91yo1-M"
  },
  "song2": {
    "artist": "Portugal, The Man",
    "created": "Thu, 06 Dec 2018 04:25:37 GMT",
    "created_by": {
      "email": "nytxm@yahoo.com",
      "member_since": "Tue, 04 Dec 2018 05:06:48 GMT",
      "username": "nkhandker"
    },
    "id": 3,
    "title": "Feel It Still",
    "url": "https://www.youtube.com/watch?v=pBkHHoOIIn8"
  },
  "vote_count": 1
}
``` 

### you can also delete song votes 

run 'DELETE' https://soundslike.com/song_relations/2/vote
```json
{
  "created": "Sat, 08 Dec 2018 01:45:13 GMT",
  "created_by": {
    "email": "balls@yahoo.com",
    "member_since": "Thu, 06 Dec 2018 03:29:28 GMT",
    "username": "nickerino"
  },
  "has_voted": false,
  "id": 2,
  "song1": {
    "artist": "Portugal, The Man",
    "created": "Thu, 06 Dec 2018 04:25:37 GMT",
    "created_by": {
      "email": "wartimeafternoon@gmail.com",
      "member_since": "Tue, 04 Dec 2018 05:06:48 GMT",
      "username": "wartimeafternoon"
    },
    "id": 3,
    "title": "Feel It Still",
    "url": "https://www.youtube.com/watch?v=pBkHHoOIIn8"
  },
  "song2": {
    "artist": "Codeine",
    "created": "Sat, 08 Dec 2018 01:44:48 GMT",
    "created_by": {
      "email": "balls@yahoo.com",
      "member_since": "Thu, 06 Dec 2018 03:29:28 GMT",
      "username": "nickerino"
    },
    "id": 4,
    "title": "Pickup Song",
    "url": "https://www.youtube.com/watch?v=YsmvzBYo7Bc"
  },
  "vote_count": 0
}
``` 
there will be one fewer vote