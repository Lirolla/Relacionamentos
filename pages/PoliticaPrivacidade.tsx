import React from 'react';
import { Heart, ArrowLeft, Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';

const PoliticaPrivacidade: React.FC = () => {
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
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
            <Shield size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-black text-gray-900">Política de Privacidade</h1>
            <p className="text-gray-600 mt-2">Última atualização: 22 de fevereiro de 2026</p>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-12">
          <p className="text-blue-900 font-bold leading-relaxed">
            <Lock size={20} className="inline mr-2" />
            Sua privacidade é extremamente importante para nós. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-10 space-y-10">
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <Database size={28} className="text-amber-600" />
              1. Informações que Coletamos
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Coletamos diferentes tipos de informações para fornecer e melhorar nosso serviço:
            </p>
            
            <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">1.1 Informações Fornecidas por Você</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Nome completo, data de nascimento, gênero</li>
              <li>Endereço de e-mail e número de telefone</li>
              <li>Fotos e vídeos do perfil</li>
              <li>Localização (cidade, estado)</li>
              <li>Informações religiosas (denominação, igreja, ministério)</li>
              <li>Biografia, interesses e preferências</li>
              <li>Informações de pagamento (processadas por terceiros)</li>
              <li>Mensagens e conteúdo compartilhado na plataforma</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">1.2 Informações Coletadas Automaticamente</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Endereço IP e dados de localização (GPS)</li>
              <li>Tipo de dispositivo, sistema operacional e navegador</li>
              <li>Dados de uso (páginas visitadas, tempo de uso, cliques)</li>
              <li>Cookies e tecnologias similares</li>
              <li>Logs de acesso e atividades na plataforma</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">1.3 Informações de Terceiros</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Informações de redes sociais (se você optar por conectar sua conta)</li>
              <li>Informações de verificação de identidade</li>
              <li>Denúncias e relatórios de outros usuários</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <Eye size={28} className="text-amber-600" />
              2. Como Usamos Suas Informações
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Usamos suas informações para os seguintes propósitos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Criar e gerenciar sua conta no Conexão Divina</li>
              <li>Fornecer, operar e melhorar nossos serviços</li>
              <li>Conectar você com outros usuários compatíveis</li>
              <li>Processar pagamentos e transações</li>
              <li>Enviar notificações, atualizações e comunicações importantes</li>
              <li>Personalizar sua experiência e recomendar perfis</li>
              <li>Garantir a segurança e prevenir fraudes</li>
              <li>Moderar conteúdo e aplicar nossos Termos de Uso</li>
              <li>Analisar tendências e melhorar nossa plataforma</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Responder a solicitações de suporte ao cliente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <UserCheck size={28} className="text-amber-600" />
              3. Base Legal para Processamento (LGPD)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Processamos seus dados pessoais com base nas seguintes bases legais previstas na LGPD:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Consentimento:</strong> Você consente com o processamento ao criar uma conta e aceitar esta política</li>
              <li><strong>Execução de Contrato:</strong> Necessário para fornecer os serviços que você solicitou</li>
              <li><strong>Legítimo Interesse:</strong> Para melhorar nossos serviços, prevenir fraudes e garantir segurança</li>
              <li><strong>Cumprimento de Obrigação Legal:</strong> Quando exigido por lei</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">4. Compartilhamento de Informações</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Podemos compartilhar suas informações nas seguintes circunstâncias:
            </p>
            
            <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">4.1 Com Outros Usuários</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Suas informações de perfil (fotos, nome, idade, igreja, bio) são visíveis para outros usuários da plataforma. Você controla quais informações compartilhar em seu perfil.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">4.2 Com Prestadores de Serviços</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Compartilhamos informações com empresas terceirizadas que nos ajudam a operar a plataforma:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provedores de hospedagem e infraestrutura</li>
              <li>Processadores de pagamento</li>
              <li>Serviços de análise e marketing</li>
              <li>Serviços de verificação de identidade</li>
              <li>Serviços de suporte ao cliente</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">4.3 Por Razões Legais</h3>
            <p className="text-gray-700 leading-relaxed">
              Podemos divulgar suas informações se exigido por lei, ordem judicial, ou para proteger nossos direitos, propriedade ou segurança de nossos usuários.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <Lock size={28} className="text-amber-600" />
              5. Segurança de Dados
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Implementamos medidas técnicas e organizacionais para proteger suas informações:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Criptografia de dados em trânsito e em repouso</li>
              <li>Controles de acesso rigorosos</li>
              <li>Monitoramento de segurança 24/7</li>
              <li>Auditorias de segurança regulares</li>
              <li>Treinamento de funcionários em proteção de dados</li>
              <li>Planos de resposta a incidentes</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro. Embora nos esforcemos para proteger suas informações, não podemos garantir segurança absoluta.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">6. Retenção de Dados</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mantemos suas informações pessoais pelo tempo necessário para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Fornecer nossos serviços enquanto sua conta estiver ativa</li>
              <li>Cumprir obrigações legais, resolver disputas e fazer cumprir nossos acordos</li>
              <li>Prevenir fraudes e garantir a segurança da plataforma</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Quando você exclui sua conta, removemos suas informações pessoais de nossos sistemas ativos, exceto quando a retenção for necessária por razões legais ou de segurança.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <FileText size={28} className="text-amber-600" />
              7. Seus Direitos (LGPD)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
              <li><strong>Confirmação e Acesso:</strong> Confirmar se processamos seus dados e acessá-los</li>
              <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li><strong>Anonimização, Bloqueio ou Eliminação:</strong> Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos</li>
              <li><strong>Portabilidade:</strong> Solicitar a portabilidade de seus dados a outro fornecedor de serviço</li>
              <li><strong>Eliminação:</strong> Solicitar a eliminação de dados tratados com base no consentimento</li>
              <li><strong>Informação:</strong> Obter informações sobre entidades públicas e privadas com as quais compartilhamos dados</li>
              <li><strong>Informação sobre Consentimento:</strong> Ser informado sobre a possibilidade de não fornecer consentimento e as consequências</li>
              <li><strong>Revogação de Consentimento:</strong> Revogar seu consentimento a qualquer momento</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-6">
              Para exercer qualquer um desses direitos, entre em contato conosco através do email: <strong>privacidade@conexaodivina.com.br</strong>
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">8. Cookies e Tecnologias Similares</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Usamos cookies e tecnologias similares para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Manter você conectado à sua conta</li>
              <li>Lembrar suas preferências e configurações</li>
              <li>Analisar como você usa nossa plataforma</li>
              <li>Personalizar conteúdo e anúncios</li>
              <li>Melhorar a segurança</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Você pode controlar o uso de cookies através das configurações do seu navegador, mas isso pode afetar a funcionalidade da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">9. Transferência Internacional de Dados</h2>
            <p className="text-gray-700 leading-relaxed">
              Seus dados podem ser transferidos e mantidos em servidores localizados fora do Brasil. Quando isso ocorrer, garantimos que medidas adequadas de proteção sejam implementadas de acordo com a LGPD, incluindo cláusulas contratuais padrão e certificações de privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">10. Menores de Idade</h2>
            <p className="text-gray-700 leading-relaxed">
              O Conexão Divina é destinado apenas a pessoas com 18 anos ou mais. Não coletamos intencionalmente informações de menores de 18 anos. Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos medidas para excluir essas informações imediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">11. Alterações a Esta Política</h2>
            <p className="text-gray-700 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas publicando a nova política em nossa plataforma e atualizando a data de "Última atualização" no topo desta página. Recomendamos que você revise esta política regularmente.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">12. Encarregado de Proteção de Dados (DPO)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nomeamos um Encarregado de Proteção de Dados (DPO) para atuar como canal de comunicação entre você, o Conexão Divina e a Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
            <div className="mt-4 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
              <p className="text-gray-900 font-bold mb-2">Encarregado de Proteção de Dados (DPO)</p>
              <p className="text-gray-800">Email: <strong>dpo@conexaodivina.com.br</strong></p>
              <p className="text-gray-800">Telefone: <strong>(11) 99999-9999</strong></p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-4">13. Contato</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou ao tratamento de seus dados pessoais, entre em contato conosco:
            </p>
            <div className="mt-4 p-6 bg-amber-50 rounded-2xl border-2 border-amber-200">
              <p className="text-gray-900 font-bold mb-2">Conexão Divina - Suporte de Privacidade</p>
              <p className="text-gray-800">Email: <strong>privacidade@conexaodivina.com.br</strong></p>
              <p className="text-gray-800">WhatsApp: <strong>(11) 99999-9999</strong></p>
              <p className="text-gray-800 mt-2">Endereço: <strong>Av. Paulista, 1000 - São Paulo, SP - Brasil</strong></p>
            </div>
          </section>

          <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl border-2 border-blue-300">
            <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <Shield size={28} className="text-blue-600" />
              Seu Compromisso com a Privacidade
            </h3>
            <p className="text-gray-800 leading-relaxed">
              No Conexão Divina, levamos sua privacidade a sério. Estamos comprometidos em proteger suas informações pessoais e em ser transparentes sobre como as usamos. Se você tiver alguma dúvida ou preocupação, não hesite em entrar em contato conosco. Sua confiança é fundamental para nós.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
