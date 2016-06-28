var itemLines = [
"Good thing Anna knows how to make paper,<br />" +
"or else she'd have to compose this tale the<br />" +
"elven way - with oral history. ",
"An inherited memento. It appears to be empty<br />" +
"now.",
"A well-worn scythe with a gemstone eye at<br />" +
"its center. It's quite gaudy, honestly. ",
"A first edition paperback of the fictionalized<br />" +
"adventures of Anna's mother. ",
"Why was this even worth picking up? "
];

var tiberiasDialogue1 = [
"Tiberias! I've started! ^<br />" +
"I've started writing it! Our stories! Our history! ",
"I'm sure that if we put our heads together, we can<br />" +
"find some answers. ",
"I'm so excited! ",
"... ",
"What's wrong? ",
"ugh. ^<br />Can't you just leave things alone? ",
"I know you're a curious girl, Anna, and I know you<br />" +
"love stories, but do me a favor and just fuck right<br />off. ",
"... ^<br />Excuse me? ",
"What's that saying human farmers have? Never<br />" +
"check the teeth of a gifted horse? ",
"Has it occurred to you that maybe where we are,<br />" +
"and that we're alive, that it's a gift? ",
"What good does it do to ask questions when we<br/>" +
"have the answer? ",
"If this is the answer, how do we know anything if<br />" +
"we don't ask the questions? We don't! ",
"Tiberias... are you okay? ",
"Do I sound okay? No, I'm pissed off! ",
"How DARE you scrutinize what you've been given! ^<br />" +
"Get out of my face! "
];

var tiberiasProfiles1 = [
0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1
];

var tiberiasDialogue2 = [
"Tiberias... ",
"Fuck off, Anna. ",
"Back off right now before I do something we'll<br />" +
"BOTH regret. "
];

var tiberiasProfiles2 = [
0, 1, 1
];

var daiteDialogue1 = [
"Hello, Daite! ",
"Hi, Anna. ",
"Have I told you that I love your new look? The<br />" +
"glamour of a flowing cape meets your natural<br />" +
"conservatism. Perfect! ",
"Oh, thank you. ^<br />I didn't think about it that much. ",
"Where is everyone? It seems quiet here. ",
"They're around. ^<br />" +
"Julia and Tobias went for a walk in the woods<br />" +
"so I thought I'd let them have some privacy. ",
"Ooh~! ",
"How does it feel getting to know your father?<br />" +
"What is he like? Is he everything you imagined? ",
"He's nice. Although he's a bit of a kid. ^<br />" +
"I don't know what I was expecting. ",
"But... I like him. I like him a lot. ",
"All adults are just kids, but taller. ",
"Yeah... ^<br />Humans, anyway. ",
"Haha! Maybe you're right. "
];

var daiteProfiles1 = [
0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0
];

daiteDialogue2 = [
"So, Daite. I've started our stories! ",
"Stories? ",
"Yeah, I'm going to collect our stories! ",
"Then maybe we can have a sense of what happened<br />" +
"that got us here, or what this place is. ",
"Hmm. Okay. ^<br />That could be interesting. ",
"I think so! I want to finally hear what happened to<br />" +
"everyone. ",
"I could use some help though. Both with story<br />" +
"recounts and making paper, if that's okay. ",
"Paper... with the trees? ",
"I thought I'd better not use the trees, since I<br />" +
"know how the elves feel about that. ",
"But there's a kind of grass near the beach that I<br />" +
"think we could press into pages. It just requires<br />" +
"some smashing. ",
"I could definitely help with smashing. ",
"Thanks! "
];

daiteProfiles2 = [
0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
];

daiteDialogue3 = [
"I don't think Tiberias is too happy about me finding<br />" +
"out everyone's stories. ",
"No? ",
"He was pretty threatening about the whole thing,<br />" +
"actually. ",
"I've never seen him like this. ^<br />" +
"Did something happen? ",
"I don't know. ^<br />" +
"I'm sorry. ",
"But I have noticed he's been... bitter. ^<br />" +
"I didn't like to ask. ",
"I know. ^<br />Sorry for gossiping. "
];

daiteProfiles3 = [
0, 1, 0, 0, 1, 1, 0
];

daiteDialogue4 = [
"Let me know when you want to take a break and<br />" +
"teach me how to make paper. ",
"I'll look around to see if we have the materials to<br />" +
"make ink, too. I used to make lots of ink. ",
"Great! "
];

daiteProfiles4 = [
1, 1, 0
];

denDialogue1 = [
"Hey! ^<br />Den, was it? ",
"Yeah. ^<br />And you're Anna? ",
"Right! ^<br />It's nice to meet you properly. ",
"Yeah, I've heard about you. ",
"Oh, really? ",
"Sure. You can find 'The Adventures of Southwise<br />" +
"Saanvi', edition number a billion, in a lot of<br />" +
"libraries where I come from. ",
"Edition a billion? ",
"I'm exaggerating, obviously. ^<br />" +
"They're classics, though. Especially the ones you<br />" +
"wrote. ",
"I wrote a book report on 'The Rescue of Ram' when<br />" +
"I was in junior high, so I know all about you. ",
"That's strange to think about, but I'm glad. ^<br />" +
"What's junior high? ",
"Haha, nevermind. It's complicated. ",
"Hmm, if you say so. ",
"I just wanted to let everyone know that I've started<br />" +
"working on our stories! ^<br />" +
"I wanted to start collecting them together, so we can<br />" +
"get a sense of where we are, and how we got here. ",
"Our stories... ^<br />" +
"Thank you. I'm really interested in seeing that. ",
"I never thought much about it, but I'm starting to<br />" +
"feel like it might be a human thing to be so...<br />" +
"curious. ",
"The elves don't seem to care about where we are, or<br />" +
"how we got here. I can't help but feel unsatisfied. ^<br />" +
"I suppose we could get by without knowing, but it<br />" +
"would always bother me. ",
"Me too. ^<br />" +
"I spent a lot of time with elves and I always thought<br />" +
"about what our differences were. They don't<br />" +
"question their lives very much. ",
"Wouldn't it be nice, to be so certain and comfortable<br />" +
"with whatever you have? ",
"I envy that. ",
"So do I. ",
"Anyway, enough philosophy. ^<br />" +
"What do you need from me? I'd be happy to help. ",
"Nothing yet. ^<br />" +
"When the time comes, would you be willing to tell<br />" +
"me your story? ",
"Of course. ^<br />" +
"I'd like to do anything that could help us find answers. ",
"I look forward to seeing how we're connected. "
];

denProfiles1 = [
0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0
];

denDialogue2 = [
"This might be an unusual question but... ^<br />" +
"Do you know Tiberias? ",
"I do. ",
"He seems quite upset about what I'm doing. ^<br />" +
"\"What good does it do to ask questions when we have<br />" +
"the answer\", he said. ",
"He actually told me to fuck off. ",
"...hmm. ^<br />" +
"I want to just say \"elves\", but the others seem<br />" +
"indifferent at best. ",
"Did something happen? Do you know? ",
"What *didn't* happen to Tiberias? ^<br />" +
"Specifically though, no. I don't know. ",
"I've tried to speak to him a few times since we got<br />" +
"here and he's been distant.<br />" +
"He hasn't told me anything. ",
"... ",
"Are you okay, Den? ",
"Sorry, I'm fine. ",
"I thought Tiberias and I were pretty close, but I<br />" +
"lived a lot of my years without him. I was glad to<br />" +
"see him again. So for him to be distant like this is<br />" +
"pretty... depressing. ",
"To expect us to pick up where we left off is pretty<br />" +
"stupid. ",
"It's not stupid. There's no reason not to expect him<br />" +
"to still be a friend to you. ",
"If you say so. ",
"I do. ^<br />" +
"Don't worry Den, I'm sure he's just working through<br />" +
"some things. He'll come around. ",
"I hope so. "
];

denProfiles2 = [
0,1,0,0,1,0,1,1,1,0,1,1,1,0,1,0,1
]

denDialogue3 = [
"I'll be here when you need me. "
]

denProfiles3 = [
1
]

//below are scene-specific entries for the menu
//might want to move to a separate file later
//LORE:
peopleNames = [
"Anna Khatri", "Daite", "Den", "Elves", "Humans", "Julia", "Ram",
"Southwise Saanvi", "Tobias", "Tiberias"
]

peopleDescriptions = [
"Author, farmer and archivist of our tale. <br />" +
"Anna is the daughter of Southwise Saanvi, an <br />" +
"adventurer of her age who has many pulp <br />" +
"fiction novels written of her journeys. Anna<br />" +
"wrote many of these books herself, as well.",
"Daite is a half-elf, half-human girl who <br />" +
"lived her life as a mercenary under the guide<br />" +
"of the elven queen. Although physically<br />" +
"strong, she's quiet in spite of her natural<br />" +
"charisma, preferring a life of service.",
"Den (last name unretrieved) comes from a<br />" +
"time after Anna, speaking of a world where <br />" +
"she was well-known and with concepts she<br />" +
"can't understand. Den is meek but kind, and<br />" +
"has a soothing voice. His left eye is silver<br />" +
"and blind.",
"So far we've only actually seen a racial <br />" +
"group known amongst themselves as \"Sun<br />" +
"Elves\" or toranin in elvish.",
"An invasive species.",
"Daite's mother, one of Anna's mentors. \"Julia\"<br />" +
"is not her given name, but one given fondly<br />" +
"to her by Daite's father, Tobias.",
"Ram Laksmi was the name of Anna's father.",
"The more well-known name of Anna's mother,<br />" +
"Saanvi Khatri. Pulp fictions chronicling her<br />" +
"adventures as a youth made her a household <br />" +
"name.",
"Daite's father, a human.",
"A kind soul gone wrong, Tiberias has become<br />" +
"bitter somehow. Chronic alcoholic. Best<br />" +
"friend of Julia. He used to be caring and <br />" +
"warm, although snippy. What happened to<br />" +
"Tiberias?"
]

placeNames = [
"After"
]

placeDescriptions = [
"Not much information on this place exists<br />" +
"yet, but the questions will be asked and<br />" +
"answered, if Anna has anything to do with it!<br />" +
"After appears to be in a state of perpetual<br />" +
"nighttime, with generous gleaming stars and<br />" +
"an absent moon. It is a small island isolated<br />" +
"on a vast ocean with no other land masses in<br />" +
"sight. The island has steep cliffs, sandy<br />" +
"and rocky beaches, and is heavily forested<br />" +
"with both shady and fruit-bearing trees."
]

itemNames = [
"The Adventures of Southwise Saanvi",
"The Eye of David",
"Prologue, part 1",
"Prologue, part 2",
"The Rescue of Ram",
"Small Glass Bottle"
]

itemDescriptions = [
"A first edition paperback of the fictionalized<br />" +
"adventures of Anna's mother.",
"A well-worn scythe with a gemstone eye at<br />" +
"its center.",
"To you, my comrade.<br /><br />" +
"I am Anna Khatri, daughter of Ram and<br />" +
"Saanvi. I am writing from the afterlife, or<br />" +
"what I have begun to refer to as \"The After\".<br /><br />" +
"We woke up here some time ago, although<br />" +
"precisely how long I cannot say. This land<br />" +
"is in a state of constant starry evening. We<br />" +
"eat, although we aren't hungry. We sleep,<br />" +
"although we aren't tired. We perform the<br />" +
"functions of people who have spent their<br />" +
"lives in bodies, as if a matter of habit,<br />" +
"not necessity.<br /><br />" +
"While I could deny that this place is an<br />" +
"afterlife based on these, there are stranger<br />" +
"things that I can't explain.<br /><br />" +
"People who were once long dead are here<br />" +
"with me.<br /><br />" +
"There are people here who are legendary.<br />" +
"People I knew from stories from the families<br />" +
"who loved them",
"People I once knew are here, and some of<br />" +
"them have changed immensely.<br /><br />" +
"And then there are people I don't know.<br />" +
"People who remember a world I can hardly<br />" +
"wrap my head around. They talk about things<br />" + 
"that I can't understand. They tell me that<br />" + 
"I wasmyself long dead. They knew me from<br />" +
"stories, and I, too, was legendary.<br /><br />" +
"That we are occupying an afterlife is the<br />" +
"only explanationI have, but I find myself<br />" +
"distracted still by another question:<br /><br />" +
"Why are we here?<br /><br />" +
"There are only twelve people on this island,<br />" +
"and we must all be connected, and I think<br />" +
"I know how.",
"A Southwise Saanvi adventure written by Anna<br />" +
"herself. A fictionalized account of how her<br />" +
"mother and father met. Ram appears to have<br />" +
"been quite the damsel in distress.",
"An inherited momento. It appears to be empty<br />" +
"now."
]