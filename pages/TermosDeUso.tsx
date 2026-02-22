import React from 'react';
import { Heart, ArrowLeft } from 'lucide-react';

const TermosDeUso: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Heart size={20} className="text-white fill-white" />
            </div>
            <span className="text-xl font-black text-gray-900">Conexão Divina</span>
          </a>
          <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors font-semibold">
            <ArrowLeft size={18} /> Voltar
          </a>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Termos de Uso</h1>
        <p className="text-gray-600 mb-12">Última atualização: 22 de fevereiro de 2026</p>

        <div className="bg-white rounded-3xl shadow-lg p-10 space-y-10">
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">1. Aceitação dos Termos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ao acessar e usar o Conexão Divina ("Plataforma", "App", "Serviço"), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
            </p>
            <p className="text-gray-700 leading-relaxed">
              O Conexão Divina é uma plataforma de relacionamento exclusiva para cristãos solteiros que buscam conexões sérias e duradouras baseadas em valores e fé cristã.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">2. Elegibilidade</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Para usar o Conexão Divina, você deve:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Ter pelo menos 18 anos de idade</li>
              <li>Ser legalmente capaz de celebrar contratos vinculativos</li>
              <li>Não estar proibido de usar o serviço sob as leis do Brasil</li>
              <li>Não ter sido previamente banido ou removido da plataforma</li>
              <li>Ser solteiro(a) e buscar um relacionamento cristão sério</li>
              <li>Professar a fé cristã e respeitar os valores cristãos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">3. Criação de Conta</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ao criar uma conta no Conexão Divina, você concorda em:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Fornecer informações verdadeiras, precisas, atuais e completas sobre você</li>
              <li>Manter e atualizar prontamente suas informações para mantê-las verdadeiras, precisas, atuais e completas</li>
              <li>Manter a segurança e confidencialidade de sua senha</li>
              <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta</li>
              <li>Ser responsável por todas as atividades que ocorrem em sua conta</li>
              <li>Não criar mais de uma conta pessoal</li>
              <li>Não criar uma conta para outra pessoa sem permissão</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">4. Sistema de Convites</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              O Conexão Divina opera com um sistema de convites exclusivo para garantir a qualidade e segurança da comunidade:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Novos usuários podem se cadastrar através de um código de convite de um membro existente</li>
              <li>Usuários que se cadastram com convite são aprovados automaticamente</li>
              <li>Usuários que se cadastram sem convite entram em uma fila de espera para aprovação manual</li>
              <li>A aprovação manual é realizada pela equipe do Conexão Divina e pode levar até 48 horas</li>
              <li>Reservamo-nos o direito de recusar qualquer solicitação de cadastro sem fornecer justificativa</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">5. Conduta do Usuário</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Você concorda em NÃO usar o Conexão Divina para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Publicar conteúdo falso, enganoso, difamatório, obsceno, pornográfico ou ofensivo</li>
              <li>Assediar, intimidar, ameaçar ou prejudicar outros usuários</li>
              <li>Usar linguagem profana, ofensiva ou que viole os valores cristãos</li>
              <li>Solicitar dinheiro ou informações financeiras de outros usuários</li>
              <li>Promover atividades ilegais ou antiéticas</li>
              <li>Personificar outra pessoa ou entidade</li>
              <li>Usar fotos que não sejam suas ou que violem direitos autorais</li>
              <li>Promover outras plataformas, produtos ou serviços sem autorização</li>
              <li>Usar o serviço para fins comerciais sem autorização expressa</li>
              <li>Coletar informações de outros usuários para fins não autorizados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">6. Conteúdo do Usuário</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Você é o único responsável pelo conteúdo que publica no Conexão Divina, incluindo fotos, vídeos, textos, mensagens e qualquer outra informação. Ao publicar conteúdo, você garante que:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Você possui todos os direitos necessários sobre o conteúdo</li>
              <li>O conteúdo não viola direitos de terceiros</li>
              <li>O conteúdo está em conformidade com estes Termos de Uso</li>
              <li>O conteúdo respeita os valores e princípios cristãos</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Você concede ao Conexão Divina uma licença mundial, não exclusiva, livre de royalties, transferível e sublicenciável para usar, reproduzir, distribuir, preparar trabalhos derivados, exibir e executar seu conteúdo em conexão com o serviço.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">7. Verificação de Identidade</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              O Conexão Divina oferece um sistema de verificação de identidade por vídeo selfie e verificação pastoral para aumentar a segurança e confiança na plataforma:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>A verificação é opcional mas altamente recomendada</li>
              <li>Usuários verificados recebem um selo especial em seus perfis</li>
              <li>A verificação pastoral requer confirmação de um pastor ou líder da sua igreja</li>
              <li>Reservamo-nos o direito de solicitar verificação adicional a qualquer momento</li>
              <li>Perfis não verificados podem ter funcionalidades limitadas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">8. Planos e Pagamentos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              O Conexão Divina oferece planos gratuitos e premium:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>O plano gratuito oferece funcionalidades básicas com limitações</li>
              <li>O plano premium oferece funcionalidades avançadas mediante pagamento de assinatura mensal</li>
              <li>Os preços estão sujeitos a alterações mediante aviso prévio de 30 dias</li>
              <li>As assinaturas são renovadas automaticamente até o cancelamento</li>
              <li>Você pode cancelar sua assinatura a qualquer momento através das configurações da conta</li>
              <li>Não oferecemos reembolsos para períodos parciais de assinatura</li>
              <li>Todos os pagamentos são processados por gateways de pagamento seguros de terceiros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">9. Moderação e Denúncias</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              O Conexão Divina possui um sistema de moderação e denúncias para manter a comunidade segura:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Usuários podem denunciar perfis, mensagens ou conteúdos inadequados</li>
              <li>Todas as denúncias são analisadas pela equipe de moderação</li>
              <li>Reservamo-nos o direito de remover conteúdo que viole estes termos</li>
              <li>Usuários que violarem repetidamente os termos podem ser advertidos, suspensos ou banidos permanentemente</li>
              <li>Decisões de moderação são finais e não estão sujeitas a recurso</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">10. Segurança e Encontros Presenciais</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              O Conexão Divina oferece ferramentas de segurança, mas você é responsável por sua própria segurança:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Nunca compartilhe informações financeiras ou senhas com outros usuários</li>
              <li>Use o Modo Acompanhante ao encontrar alguém pessoalmente pela primeira vez</li>
              <li>Encontre-se em locais públicos e seguros</li>
              <li>Informe amigos ou familiares sobre seus planos</li>
              <li>Confie em seus instintos e denuncie comportamentos suspeitos</li>
              <li>O Conexão Divina não realiza verificação de antecedentes criminais</li>
              <li>Não somos responsáveis por encontros presenciais entre usuários</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">11. Propriedade Intelectual</h2>
            <p className="text-gray-700 leading-relaxed">
              O Conexão Divina e todo o seu conteúdo, recursos e funcionalidades (incluindo, mas não se limitando a, informações, software, texto, exibições, imagens, vídeo e áudio, e o design, seleção e arranjo dos mesmos) são de propriedade do Conexão Divina, seus licenciadores ou outros fornecedores de tal material e são protegidos por leis de direitos autorais, marcas registradas, patentes, segredos comerciais e outras leis de propriedade intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">12. Isenção de Garantias</h2>
            <p className="text-gray-700 leading-relaxed">
              O CONEXÃO DIVINA É FORNECIDO "COMO ESTÁ" E "CONFORME DISPONÍVEL", SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS OU IMPLÍCITAS. NÃO GARANTIMOS QUE O SERVIÇO SERÁ ININTERRUPTO, SEGURO OU LIVRE DE ERROS. NÃO GARANTIMOS RESULTADOS OU SUCESSO EM ENCONTRAR UM PARCEIRO.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">13. Limitação de Responsabilidade</h2>
            <p className="text-gray-700 leading-relaxed">
              EM NENHUMA CIRCUNSTÂNCIA O CONEXÃO DIVINA, SEUS DIRETORES, FUNCIONÁRIOS, PARCEIROS, AGENTES, FORNECEDORES OU AFILIADOS SERÃO RESPONSÁVEIS POR QUAISQUER DANOS INDIRETOS, INCIDENTAIS, ESPECIAIS, CONSEQUENCIAIS OU PUNITIVOS, INCLUINDO, SEM LIMITAÇÃO, PERDA DE LUCROS, DADOS, USO, BOA VONTADE OU OUTRAS PERDAS INTANGÍVEIS, RESULTANTES DO USO OU INCAPACIDADE DE USAR O SERVIÇO.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">14. Rescisão</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Podemos encerrar ou suspender sua conta e acesso ao serviço imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos de Uso.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Você pode encerrar sua conta a qualquer momento através das configurações da conta. Após o encerramento, seu direito de usar o serviço cessará imediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">15. Lei Aplicável</h2>
            <p className="text-gray-700 leading-relaxed">
              Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas disposições sobre conflitos de leis. Qualquer disputa relacionada a estes Termos será resolvida nos tribunais competentes do Brasil.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">16. Alterações aos Termos</h2>
            <p className="text-gray-700 leading-relaxed">
              Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, tentaremos fornecer um aviso de pelo menos 30 dias antes de quaisquer novos termos entrarem em vigor. O que constitui uma mudança material será determinado a nosso exclusivo critério.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">17. Contato</h2>
            <p className="text-gray-700 leading-relaxed">
              Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <div className="mt-4 p-6 bg-amber-50 rounded-2xl">
              <p className="text-gray-800 font-bold">Email: suporte@conexaodivina.com.br</p>
              <p className="text-gray-800 font-bold">WhatsApp: (11) 99999-9999</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermosDeUso;
