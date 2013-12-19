## workflow

1. plan possible actions in spaces
2. beings assign weights to actions based on preference
3. spaces assign weights to actions based on waste
4. spaces request offers
5. beings execute offers by completing action
6. other beings validate completed actions

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
