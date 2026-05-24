import {
    CheckCircle2,
    Boxes,
    Link2,
    ShieldCheck,
    Trophy,
    X,
} from 'lucide-react';

export const AnalysisModal = ({
    isOpen,
    onClose,
    analysis,
}) => {

    if (!isOpen) return null;

    return (

        <div className="
      fixed
      inset-0
      z-[1000]
      flex
      items-center
      justify-center
      bg-black/20
      backdrop-blur-sm
    ">

            <div className="
        relative
        w-[760px]
        rounded-[36px]
        border
        border-violet-200
        bg-white/90
        shadow-2xl
        backdrop-blur-xl
        px-8
        py-10
      ">

                {/* CLOSE BUTTON */}

                <button
                    onClick={onClose}
                    className="
            absolute
            top-6
            right-6
            h-12
            w-12
            rounded-full
            bg-white
            border
            border-slate-200
            shadow-md
            flex
            items-center
            justify-center
            hover:scale-105
            transition-all
          "
                >
                    <X className="h-5 w-5 text-slate-600" />
                </button>

                {/* ICON */}

                <div className="
          mx-auto
          mb-6
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-violet-100
        ">
                    <ShieldCheck className="h-12 w-12 text-violet-600" />
                </div>

                {/* HEADER */}

                <div className="text-center">

                    <h1 className="
            text-4xl
            font-semibold
            tracking-tight
            text-slate-900
          ">
                        Pipeline Analysis
                    </h1>

                    <p className="
            mt-2
            text-lg
            text-slate-500
          ">
                        We analyzed your workflow
                    </p>

                </div>

                {/* STATUS BAR */}

                <div className="
          mt-8
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-emerald-200
          bg-emerald-50
          px-6
          py-5
        ">

                    <div className="flex items-center gap-4">

                        <div className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-emerald-100
            ">
                            <CheckCircle2 className="text-emerald-600" />
                        </div>

                        <div>
                            <h2 className="
                text-2xl
                font-semibold
                text-emerald-700
              ">
                                Valid DAG
                            </h2>

                            <p className="text-emerald-600">
                                No cycles detected
                            </p>
                        </div>

                    </div>

                    <p className="
            text-sm
            font-medium
            text-emerald-700
          ">
                        Ready to execute 🎉
                    </p>

                </div>

                {/* STATS */}

                <div className="
          mt-8
          grid
          grid-cols-3
          gap-5
        ">

                    {/* NODES */}

                    <div className="
            rounded-3xl
            border
            border-violet-200
            bg-violet-50/70
            p-6
          ">

                        <div className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-violet-100
            ">
                            <Boxes className="text-violet-600" />
                        </div>

                        <h2 className="
              mt-5
              text-5xl
              font-semibold
              text-violet-600
            ">
                            {analysis.num_nodes}
                        </h2>

                        <p className="
              mt-2
              text-lg
              font-medium
              text-slate-800
            ">
                            Nodes
                        </p>

                        <p className="
              mt-1
              text-sm
              text-slate-500
            ">
                            Total workflow nodes
                        </p>

                    </div>

                    {/* EDGES */}

                    <div className="
            rounded-3xl
            border
            border-sky-200
            bg-sky-50/70
            p-6
          ">

                        <div className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-sky-100
            ">
                            <Link2 className="text-sky-600" />
                        </div>

                        <h2 className="
              mt-5
              text-5xl
              font-semibold
              text-sky-600
            ">
                            {analysis.num_edges}
                        </h2>

                        <p className="
              mt-2
              text-lg
              font-medium
              text-slate-800
            ">
                            Connections
                        </p>

                        <p className="
              mt-1
              text-sm
              text-slate-500
            ">
                            Total graph edges
                        </p>

                    </div>

                    {/* DAG */}

                    <div className="
            rounded-3xl
            border
            border-emerald-200
            bg-emerald-50/70
            p-6
          ">

                        <div className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-emerald-100
            ">
                            <ShieldCheck className="text-emerald-600" />
                        </div>

                        <h2 className="
              mt-5
              text-5xl
              font-semibold
              text-emerald-600
            ">
                            {analysis.is_dag ? 'Yes' : 'No'}
                        </h2>

                        <p className="
              mt-2
              text-lg
              font-medium
              text-slate-800
            ">
                            DAG Status
                        </p>

                        <p className="
              mt-1
              text-sm
              text-slate-500
            ">
                            Graph validation
                        </p>

                    </div>

                </div>

                {/* FOOTER */}

                <div className="
          mt-8
          rounded-3xl
          border
          border-slate-200
          bg-slate-50/80
          p-6
          flex
          items-center
          justify-between
        ">

                    <div className="flex items-center gap-4">

                        <div className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-emerald-100
            ">
                            <Trophy className="text-emerald-600" />
                        </div>

                        <div>

                            <h3 className="
                text-2xl
                font-semibold
                text-slate-900
              ">
                                Great job!
                            </h3>

                            <p className="
                mt-1
                text-slate-500
              ">
                                Your pipeline is ready for execution.
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="
              rounded-2xl
              bg-gradient-to-r
              from-violet-600
              to-indigo-600
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              shadow-lg
              hover:scale-105
              transition-all
            "
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
};