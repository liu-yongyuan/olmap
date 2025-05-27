import CodeRunner from '@/components/CodeRunner'
import code from './variable-scope.ts?raw';

export default function VariableScopeRunner() {
  return <CodeRunner initialCode={code} />
}
