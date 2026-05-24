import { useStore } from './store';
import { Button } from './components/ui/button';
import { Send } from 'lucide-react';

export const SubmitButton = ({
    setAnalysisData,
    setAnalysisOpen,
}) => {

    const { nodes, edges } = useStore();

    const handleSubmit = async () => {

        try {

            const response = await fetch(
                'http://localhost:8000/pipelines/parse',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        nodes,
                        edges,
                    }),
                }
            );

            const result = await response.json();

            setAnalysisData(result);

            setAnalysisOpen(true);

        } catch (error) {

            console.error(error);

            alert('Failed to analyze pipeline.');

        }
    };

    return (
        <div
            className="
    fixed
    bottom-6
    left-1/2
    -translate-x-1/2
    z-50
  "
        >

            <button
                onClick={handleSubmit}
                className="
                    flex
                    items-center
                    gap-3
                    px-8
                    py-4
                    rounded-2xl
                    bg-gradient-to-r
                    from-violet-600
                    to-indigo-600
                    text-white
                    font-semibold
                    shadow-lg
                    hover:shadow-violet-300/50
                    hover:scale-[1.02]
                    transition-all
                "
            >

                <Send size={18} />

                Submit

            </button>

        </div>
    );
};