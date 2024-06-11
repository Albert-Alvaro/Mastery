# Mastery

Mastery is a game created using Javascript, it is a 2D Top Down action adventure games with mechanics that were heavily inspired by games such as Sekiro. A more in depth and detialed explanation of the game and what it will become can be found below.

## Description

Mastery is a 2D top down RPG with a heavy emphasis on combat. There will be an overarching story for a player to go through, and the story will also play an important role, but it is mostly going to be for facilitating the growth of the player character as well as the addition of new mechanics.

This is a game which highly prioritizes the skill of the player at inputting keys.

## Combat System

The combat system is where my inspiration struck, fighting games put a lot of emphasis on input, why not bring that over to an RPG? The way in which the combat loop works is to be as such, attack and defense. The player character will have a set of basic moves which will be binded to  I, J, K, L. These  basic movements include, Upward swing, Downward swing, Left swing, and Right swing. Bound to I, K, J, L respectively, players will always be able to do these movements, the unique part is combination of movements, if a player were to input a set of slash movements with correct timing then they will execute a moveset. Movesets are essentially a collection of special attacks which a player can do, these will be the meat of the combat, players will be able to come across differing books which will unlock these movesets for the player.

The damage of these movements are entirely dependent on the skill of the player, replacing the need for critical attacks.

The way in which the timing system work is as such, a moveset will require a specific combination input of buttons, such as,

Up, Down, Up, Up

The game will take the amount of time each input takes, and will then use the total time to determine the total damage of the attack, the attack will have a base damage and the time will determine the multiplier which the damage will be attached with. An example of a range of attacks can be,

T < 0.5s = Damage * 0.5
0.5s < T < 1s = Damage * 1
1s < T < 2s = Damage * 2
2s < T < 3s = Damage *1
T > 3s = Damage*0.5

The above is an example of the logic of the moveset system of the game, not all movesets will have a variance such as the example above. But it serves as a good example of how the system will calculate the damage of movesets. This system will henceforth be referred to as the Total Time system.

Next will be the defense inside of the game, parries and blocks shall be the main bread and butter for defense in the game, with some movesets also allowing for either blocking or evasion. But the main way of defense for most players will be parries, the attacks of the enemies in the game will be obvious whether it is a downward, upward, or side slash, to parry upward slashes players must perform a downward slash, and if the enemy slashes downward then the player must slash upward to parry, side slashes can be parried with side slashes of the opposing direction as well.

After players have parried successfully, depending on how well executed the parry is, which will be dependent on another factor, the enemy will be stunned for a number of seconds, this will allow players to counterattack with either regular attacks or a moveset.

Some enemy characters will be able to perform movesets as well, and there are a few ways to defend against them, if the enemy were still in the middle of their moveset sequence, then the player can interrupt, if the enemy has already finished their sequence, then the player must be ready with either an evasion or defense moveset.

Defense movesets will essentially work as parries but the player will not have to worry about which direction the enemy attack is coming from if they succeed in performing a defense moveset, however even if the player succeeded, then they will not stun the enemy and damage can still go through, but will be reduced by a significant portion. Defense movesets damage MITIGATION techniques, whilst parries will work as a way for players to create openings.

Evasion movesets will not use the IJKL inputs, but instead use the WASD inputs, if a player managed to input a specific combination of keys in succession then they will trigger the evasion moveset, however how effective their chance for an evade to happen will be solely determined by the total time system,  with the chance of evasion being from 10% to 100%.

Thus the core combat loop which consists of attacking and defending bolstered by some evasion mechanics.

## Player Growth

Player growth relies solely on the moveset which they possess. Common moveset will require the player to input a sequence of keys to get average damage, rare movesets will require the player to input a sequence of keys to deal above average damage, extremely rare movesets will require the player to input a short sequence of keys to deal average damage, and Legendary movesets will require the player to input a short sequence of key inputs to deal extreme damage.

Of course there will be more variance to the movesets available to the player, but the above serve as an easy way of determining the value and rarity of movesets.

Another key feature is that movesets can evolve, the player character will be able to evolve a moveset by utilizing it enough times, or repeating the activation sequence enough time, a moveset which required 4 key inputs to deal average damage can evolve to only needing 3 key inputs instead, or maybe the timings in the total time system will be made more forgiving allowing for players to more freely use the moveset to deal higher damage. The path of evolution of a moveset depends on the player, a player will still be required to swing a set total amount of time, but the way in which they swing will dramatically alter how the moveset evolves, if the player triggers crits a majority of the time, then the moveset will evolve by reducing the amount of steps and making the timings more forgiving, if the player deals a majority of base damage, then the moveset will evolve to have a reduced key input sequence, whilst if the use only spam the technique without regard to the timing, then they will be rewarded with more forgiving timings.

The key takeaway is that player growth is highly dependent on player skill.

