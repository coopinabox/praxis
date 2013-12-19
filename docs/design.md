## workflow

1. plan actions
2. assign beings
3. request times
4. execute offer

## schemas:

```yml

beings:
  - @id
  - *nick
  - [spaces]
  - [actions]

(can use actions to
schedule non-work activity)

spaces:
  - @id
  - *topic
  - [beings]

actions:
  - @id
  - @space
  - *name
  - weight
  - [instructions]

offer:
  - @id
  - ask @being
  - buy @being
  - [actions]
  - reward
  - time

```
