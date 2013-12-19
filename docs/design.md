## workflow

```yml

1. plan actions
  - spaces describe requirements
2. assign beings
  - beings describe requirements
3. time requests
  - beings receive request by space
4. execute offer
  - being decides whether or not to do action in space
5. validate actions
  - other being validates whether or not activity done

```

## schemas

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
