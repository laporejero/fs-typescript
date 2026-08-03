import type { CoursePart } from "../types";

interface PartProps {
    part: CoursePart;
}

const Part = ({ part }: PartProps) => {
    switch(part.kind) {
        case "basic":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount}</strong></p>
                    <p><em>{part.description}</em></p>
                </div>
            );
        case "group":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount}</strong></p>
                    <p>project exercises {part.groupProjectCount}</p>
                </div>
            )
        case "background":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount}</strong></p>
                    <p><em>{part.description}</em></p>
                    <p>submit to {part.backgroundMaterial}</p>
                </div>
            )
    }
}

export default Part