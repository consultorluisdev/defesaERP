export const PERMISSOES_DISPONIVEIS: string[] = [
  'ocorrencias.visualizar',
  'ocorrencias.criar',
  'ocorrencias.editar',
  'ocorrencias.excluir',
  'alertas.visualizar',
  'alertas.criar',
  'equipes.visualizar',
  'equipes.gerenciar',
  'abrigos.visualizar',
  'abrigos.gerenciar',
  'viaturas.visualizar',
  'viaturas.gerenciar',
  'riscos.visualizar',
  'riscos.gerenciar',
  'relatorios.visualizar',
  'relatorios.gerar',
  'usuarios.gerenciar',
  'configuracoes.editar',
];

interface Props {
  selecionadas: string[];
  onChange: (lista: string[]) => void;
}

export function PerfilPermissions({ selecionadas, onChange }: Props) {
  const toggle = (p: string) => {
    onChange(selecionadas.includes(p) ? selecionadas.filter((x) => x !== p) : [...selecionadas, p]);
  };
  return (
    <div className="grid max-h-56 grid-cols-1 gap-1 overflow-y-auto rounded-lg border border-gray-200 p-3 sm:grid-cols-2 dark:border-gray-700">
      {PERMISSOES_DISPONIVEIS.map((p) => (
        <label key={p} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={selecionadas.includes(p)}
            onChange={() => toggle(p)}
            className="accent-blue-600"
          />
          {p}
        </label>
      ))}
    </div>
  );
}
