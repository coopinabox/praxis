## workflow

1. beings plan possible actions in spaces
3. beings assign weights to actions based on preference
2. beings assign weights to time ranges based on availability
4. spaces assign weights to actions based on status
5. space request action offer to beings in space
6. being executes offer by completing action
7. other beings validate completed action
8. upon validation, being receives reward

## schemas

```yml

where
  @ is an indexed property
  * is a computed property

Being:
  - @id
  - nick: string
  - spaces: [Space]
  - preferences: { Action: weight }
  - availability: { TimeRange: weight }
  - *upcoming: [Offer]
  - *history: [Action]
  - resources: { unit: quantity }

(can use [Action] to
schedule non-work activity)

Space:
  - @id
  - topic: string
  - beings: [Being]
  - need: { Action: weight }

Action:
  - @id
  - @space: Space
  - name: string
  - instructions: [string]

Offer:
  - @id
  - @being
  - actions: [Action]
  - reward: (unit, quantity)
  - time: TimeRange

TimeRange: http://gf3.github.io/moment-range/
  - @start
  - @end

```
