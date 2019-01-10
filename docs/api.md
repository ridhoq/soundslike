# soundslike - API documentation
Learn how to use the soundslike API!

## Authentication 

### `POST /api/token` 

This requires a username and password with Basic HTTP Authentication 

Response:
```json
    {
        "expiration": 3000,
        "token": "token_string"
    }
``` 

For all API requests that require authentication, you need to use a `token` with these steps

1.The `token` must be passed in the Authorization header

2.The `token` must be prepended with Basic (including space)

3.The `token` must be base64 encoded with the colon appended to it

## Users 

### `POST /api/users/`

This creates a new user.

Body:
```json
{
    "username" : "method_man", 
    "email" : "method_man@wutang.clan", 
    "password": "cashruleseverythingaroundme"
}
``` 
Response:
```json
{
    "email": "ethod_man@wutang.clan",
    "member_since": "Fri, 07 Dec 2018 06:19:28 GMT",
    "username": "method_man"
}
``` 
### `GET /api/users/<username>` 

EX. /api/users/method_man

Response:
```json
{
    "email": "method_man@wutang.com",
    "member_since": "Fri, 07 Dec 2018 06:19:28 GMT",
    "username": "method_man"
}
``` 
_NOTE: the email field is only available when requesting your own user_

## Songs 

### `GET /api/songs/<song_id>`

EX. /api/songs/2

Response:
```json
{
  "related_songs": [
    {
      "artist": "Portugal, The Man",
      "created": "Thu, 06 Dec 2018 04:25:37 GMT",
      "id": 3,
      "title": "Feel It Still",
      "url": "https://www.youtube.com/watch?v=pBkHHoOIIn8",
      "user_id": 6,
      "vote_count": 1
    }
  ],
  "song": {
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
}
``` 

### `POST /api/songs/`

This creates a new song. 

Body:
```json
{
    "title" : "Feel It Still",
    "artist" : "Portugal, The Man",
    "url" : "https://www.youtube.com/watch?v=pBkHHoOIIn8"
}
``` 
Response:
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

## Song Relations

### `GET /api/songs/<song_id>/related`

Response:
```json
{
  "related_songs": [
    {
      "artist": "Portugal, The Man",
      "created": "Thu, 06 Dec 2018 04:25:37 GMT",
      "id": 3,
      "title": "Feel It Still",
      "url": "https://www.youtube.com/watch?v=pBkHHoOIIn8",
      "user_id": 6,
      "vote_count": 1
    }
  ],
  "song": {
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
}
``` 

### `POST /api/song_relations/`

Body:
```json
{
    "song1_id" : "3",
    "song2_id" : "2"
}
``` 
Response:
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

### `POST /api/song_relations/<song_relation_id>/vote`

Response:
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

### `DELETE /api/song_relations/<song_relation_id>/vote`

Response:
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
_NOTE: There will be one fewer vote_