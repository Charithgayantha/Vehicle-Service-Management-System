interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const getBadgeStyle = (currentStatus: string) => {
        const lower = currentStatus.toLowerCase();
        if (['completed', 'paid', 'active', 'success'].includes(lower)) {
            return 'bg-green-100 text-green-800 border-green-200';
        }
        if (['pending', 'in-progress', 'processing', 'ongoing'].includes(lower)) {
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
        if (['cancelled', 'overdue', 'failed', 'critical'].includes(lower)) {
            return 'bg-red-100 text-red-800 border-red-200';
        }
        return 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${getBadgeStyle(status)}`}>
            {status}
        </span>
    );
}