## workflow

1. child holons plan possible actions in parent holon
2. holons assign weights to actions based on preference
3. holons assign weights to time ranges based on availability
4. parent holon request action offer to child holons
5. child holon executes offer by completing action
6. other holons validate completed action
7. upon validation, holon receives reward

## schemas

```yml

where
  @ is an indexed property
  * is a computed property
  [item] means list of items
  { key: value } means map of (key, value) pairs

Being:
  - @id
  - holons: [Holon]

Holon:
  - @id
  - nick: string
  - topic: string
  - children: Being or [Holon]
  - parents: [Holon]
  - preferences: { Action: weight }
  - availability: { MomentRange: weight }
  - resources: { unit: quantity }
  - *upcoming: [Offer]
  - *history: [Action]

Action:
  - @id
  - @receiver: Holon
  - name: string
  - instructions: [string]
  - duration: Duration (http://momentjs.com/docs/#/durations/)

Offer:
  - @id
  - @actor: Holon
  - action: Action
  - reward: (unit, quantity)
  - timeStart: Moment (http://momentjs.com/)
  - *timeRange: MomentRange

MomentRange: http://gf3.github.io/moment-range/
  - start
  - end

```
