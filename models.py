from dataclasses import dataclass

@dataclass
class Character:
    name: str
    level: int
    health: int
    max_health: int
    experience: int
    strength: int
    defense: int
    skills: list
