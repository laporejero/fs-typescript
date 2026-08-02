interface ContentProps {
    name: string;
    exerciseCount: number;
}

interface ContentComponentProps {
    parts: ContentProps[];
}

const Content = ({ parts }: ContentComponentProps) => {
    return (
        <div>
            {
                parts.map((part, index) => (
                    <p key={index}>
                        {part.name} {part.exerciseCount}
                    </p>
                ))
            }
        </div>
    )
}

export default Content