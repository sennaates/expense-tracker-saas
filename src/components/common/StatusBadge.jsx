const StatusBadge = ({ status }) => {
  const statusConfig = {
    approved: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Onaylandı'
    },
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Bekliyor'
    },
    rejected: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Reddedildi'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
