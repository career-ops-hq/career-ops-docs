import { brand, heroLine, type HomeDict } from './home-dict';

// Vietnamese home (2026-10-15), addressing the reader as "bạn". Same trunk,
// transcreated from the English home: "tin tuyển dụng" for a listing, "offer"
// in Latin for the final job offer, "AI" rather than "trí tuệ nhân tạo", and
// the category phrase "tác tử AI mã nguồn mở để tìm việc". The core has no
// README.vi, so the restriction line is the site's own canon. Like FR, DE, PT
// and IT, the thesis stays in LITERAL English with no thesisTranslation.
// AI-assisted first pass, pending native review.
export const homeVi: HomeDict = {
  heroHook: heroLine({
    more: 'Nộp nhiều đơn hơn.',
    silencePre: 'Im lặng ',
    silence: 'nhiều hơn',
    silencePost: '.',
    stop: 'Đừng đoán mò nữa.',
    startPre: 'Hãy bắt đầu ',
    choose: 'chọn lọc',
    startPost: '.',
  }),
  heroH1: (
    <>
      career-ops: tác tử AI mã nguồn mở để tìm{' '}việc.
      <br />
      Chạy ngay trong CLI của bạn. Dữ liệu của bạn, máy của bạn.
      <br />
      Nó điều chỉnh CV và soạn câu trả lời cho bạn.{' '}
      <span className="inline-block">Bạn là người bấm Nộp.</span>
    </>
  ),
  runItNow: 'Chạy ngay',
  locale: 'vi',
  docsHref: '/vi/docs',
  manifestoHref: '/manifesto',
  heroFreeNote: 'Miễn phí cho người tìm việc, mãi mãi',
  featuredIn: 'Được nhắc đến trên',
  memberOf: 'Thành viên của',
  worthApplyingLabel: 'Có nên ứng tuyển vị trí này không? →',
  worthApplyingHref: '/vi/docs/introduction/guides/is-this-job-worth-applying-to',
  authorTagline: ', chủ doanh nghiệp suốt 16 năm và là người tạo ra career-ops',
  // No thesisTranslation for VI: the English thesis stands alone, as in FR, DE, PT and IT.
  nowSignedManifesto: <>Nay là một bản tuyên ngôn có chữ ký ·</>,
  readIt: 'Đọc →',
  whatIsHeading: (
    <>
      {brand('career-ops')}{' '}
      <span className="text-landing-foreground dark:text-landing-foreground-dark">
        là gì?
      </span>
    </>
  ),
  whatIsBody: (
    <>
      career-ops là tác tử AI mã nguồn mở để tìm việc, chạy cục bộ trên máy của
      bạn, bên trong bất kỳ CLI lập trình AI nào: Claude Code, OpenCode, Codex,
      GitHub Copilot và nhiều CLI khác. Nó soạn và điền, nhưng không bao giờ nộp.
      Bạn là người bấm Nộp. Nó chấm điểm tin tuyển dụng so với CV của bạn bằng
      thang đánh giá năm chiều cùng điểm tổng thể từ 1 đến 5, tạo CV dạng PDF tối
      ưu cho ATS và điều chỉnh theo từng tin, viết câu trả lời cho các câu hỏi mở
      trong biểu mẫu của Greenhouse, Ashby và Lever, quét hơn 150 nguồn tin tuyển
      dụng mà không tốn token, và theo dõi toàn bộ quy trình trên một dashboard
      terminal viết bằng Go. Mọi thứ nằm trên máy của bạn:{' '}
      {brand('không cloud')}, {brand('không telemetry')},{' '}
      {brand('không cần tài khoản')}. Giấy phép MIT và miễn phí mãi mãi; chi phí
      duy nhất là CLI lập trình AI mà bạn vốn đã trả tiền. Được tạo bởi Santiago
      Fernández de Valderrama Aparicio sau một đợt tìm việc thật vào năm 2026:
      740 tin tuyển dụng, 68 đơn đã nộp, 12 buổi phỏng vấn và một offer.
    </>
  ),
  statsComment: 'sao · Mã nguồn mở · MIT',
  commandCenter: (
    <>
      Biến bất kỳ CLI lập trình AI nào thành{' '}
      {brand('tác tử AI tìm việc')} của riêng bạn.
    </>
  ),
  tryItOut: 'Dùng thử',
  runsCommand: (
    <>
      Bạn cần một CLI lập trình AI làm bộ máy. Chưa thiết lập AI nào?{' '}
      <a
        href="/vi/docs/free-ai-engine"
        className="text-fd-foreground underline underline-offset-2"
      >
        Thiết lập một bộ máy miễn phí
      </a>
      .
    </>
  ),
  mechanism:
    'Thay vì theo dõi đơn ứng tuyển thủ công trong bảng tính, bạn có một quy trình do AI vận hành: quét các cổng việc làm, tạo PDF riêng cho từng vị trí và ghi lại mọi thứ giúp bạn.',
  analogy: (
    <>
      &ldquo;Giống như có một huấn luyện viên nghề nghiệp đồng hành khi tìm việc,
      nhưng {brand('không tốn phí')}.&rdquo;
    </>
  ),
  featAgnosticTitle: 'Xây cho AI, không phụ thuộc nhà cung cấp',
  featAgnosticBody: (
    <>
      Chạy với bất kỳ CLI lập trình nào: Claude Code, OpenCode, Codex, GitHub
      Copilot và nhiều CLI khác. Dựa trên Open Agent Skill Standard.
    </>
  ),
  featApplyTitle: 'Soạn câu trả lời cho các câu hỏi mở.',
  featApplyBody1: (
    <>
      Biểu mẫu của Greenhouse, Ashby và Lever hỏi &ldquo;Vì sao bạn chọn vị trí
      này?&rdquo; và &ldquo;Hãy kể về một dự án của bạn.&rdquo;{' '}
      <code className="font-mono text-brand">/career-ops apply</code> đọc biểu
      mẫu, viết từng câu trả lời dựa trên CV và mô tả công việc, rồi đưa lại cho
      bạn để dán vào.
    </>
  ),
  featApplyBody2: 'Bạn chỉnh sửa, bạn gửi. Trợ lý không bao giờ tự bấm nút thay bạn.',
  featApplyCta: 'Xem cách apply hoạt động',
  featScanTitle: 'Hơn 150 nguồn tin tuyển dụng. Không cần tìm thủ công.',
  featScanBody: (
    <>
      Các scraper dựng sẵn kiểm tra{' '}
      <a href="https://github.com/career-ops-hq/career-ops/blob/main/templates/portals.example.yml" target="_blank" rel="noopener" className="underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground">hơn 150 nguồn tin tuyển dụng</a>, trong đó có
      Greenhouse, Ashby và Lever, mỗi khi bạn muốn, mà không tốn token API nào.
      Chạy <code className="font-mono text-brand">/career-ops scan</code> và nhận
      danh sách đã xếp hạng chỉ sau vài phút.
    </>
  ),
  featScanCta: 'Xem tất cả cổng việc làm',
  featCommunityTitle: 'Xây dựng cùng cộng đồng.',
  featCommunityBody: (
    <>
      career-ops lớn lên nhờ các pull request từ những người đang thực sự đi tìm
      việc. Issue được xử lý trên Discord và bản sửa lỗi ra mắt ngay trong tuần.
      Bạn không chỉ dùng công cụ: bạn góp phần quyết định nó sẽ trở thành gì.
    </>
  ),
  joinDiscord: (n) => `Tham gia cùng hơn ${n} builder trên Discord`,
  openSourceTitle: '100% mã nguồn mở.',
  starsWord: 'sao',
  forksWord: 'fork',
  repoOfDay: 'Repo của ngày, hạng 1',
  builtByDek: (
    <>
      Được tạo bởi{' '}
      <a href="/about" rel="author" className="text-fd-foreground font-medium hover:underline">
        Santiago Fernández de Valderrama Aparicio
      </a>{' '}
      sau khi đánh giá 740 tin tuyển dụng.
      <br />
      Toàn bộ phương pháp đánh giá đã được{' '}
      <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
        công bố
      </a>
      .
      <br />
      Hiện do cộng đồng duy trì.
    </>
  ),
  meetContributors: 'Gặp những người đóng góp →',
  faqHeading: 'Câu hỏi thường gặp',
  faq: [
    {
      q: 'career-ops đánh giá một tin tuyển dụng như thế nào?',
      a: (
        <>
          career-ops dùng một bước đánh giá bằng LLM theo thang năm chiều (mức độ
          phù hợp, độ khớp với mục tiêu nghề nghiệp, mức lương, tín hiệu văn hóa
          và dấu hiệu cảnh báo), cho ra điểm tổng thể từ 1 đến 5, kèm trích dẫn
          những dòng cụ thể trong CV và yêu cầu của tin tuyển dụng. Dưới 4.0, tác
          tử khuyên bạn không nên ứng tuyển. Không có công thức cố định, không nộp
          đơn hàng loạt. Thang đánh giá đầy đủ được công bố tại{' '}
          <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/methodology
          </a>
          .
        </>
      ),
    },
    {
      q: 'career-ops có nộp đơn thay tôi không?',
      a: (
        <>
          Không. career-ops chuẩn bị mọi đơn ứng tuyển đến sát bước cuối: quét tin
          tuyển dụng, chấm điểm từng tin so với CV của bạn và tạo một phiên bản CV
          riêng cho tin đó. Sau đó quyết định thuộc về bạn. Nó soạn và điền, nhưng
          không bao giờ nộp. Bạn là người bấm Nộp. Đây là chủ ý: nộp đơn hàng loạt
          làm hỏng uy tín của bạn với nhà tuyển dụng và hệ thống sàng lọc (ATS), vì
          vậy career-ops gỡ bỏ phần việc lặp đi lặp lại và để bạn tự lựa chọn. Đọc
          thêm trong{' '}
          <a
            href="/blog/can-an-ai-agent-run-your-job-search"
            className="text-fd-foreground hover:underline underline-offset-2"
          >
            Can an AI agent run your whole job search?
          </a>{' '}
          (bằng tiếng Anh).
        </>
      ),
    },
    {
      q: 'career-ops có miễn phí không? Dự án duy trì bằng cách nào?',
      a: (
        <>
          career-ops miễn phí mãi mãi, theo giấy phép MIT và được cộng đồng tài
          trợ. Không có gói trả phí, danh sách chờ, tài khoản, telemetry hay tính
          năng cao cấp. Bạn clone repository, thiết lập hồ sơ và chạy hệ thống cục
          bộ với CLI lập trình AI mà bạn đang dùng. Nguồn lực duy trì dự án đến từ
          đóng góp của cộng đồng và tài trợ của doanh nghiệp qua quỹ Open
          Collective của dự án, không đến từ gói cao cấp, tính năng trả phí hay dữ
          liệu của bạn. Tiền nằm ở fiscal host của dự án, Open Source Collective,
          trong sổ cái công khai, và dùng cho bảo trì, bản vá bảo mật, phát hành và
          tài liệu. Chi tiết tại{' '}
          <a href="/sustain" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/sustain
          </a>
          .
        </>
      ),
    },
    {
      q: 'Dữ liệu của tôi được lưu ở đâu?',
      a: (
        <>
          career-ops giữ dữ liệu của bạn trên máy của bạn, trong các tệp thuần túy
          thuộc quyền sở hữu của bạn: CV, hồ sơ, quy trình và báo cáo đều là tệp
          Markdown/YAML cục bộ. career-ops chạy hoàn toàn trên máy của bạn, thông
          qua CLI AI của bạn: không tài khoản, không telemetry, không có gì được
          gửi đến máy chủ của career-ops. Các bản cập nhật hệ thống không bao giờ
          chạm vào lớp dữ liệu của bạn; sự tách biệt này là Data Contract. Dữ liệu
          duy nhất rời khỏi máy của bạn là dữ liệu mà CLI AI bạn chọn gửi đến nhà
          cung cấp của nó.
        </>
      ),
    },
    {
      q: 'Ai đã tạo ra career-ops?',
      a: (
        <>
          career-ops được tạo bởi{' '}
          <a href="/about" rel="author" className="text-fd-foreground hover:underline underline-offset-2">
            Santiago Fernández de Valderrama Aparicio
          </a>
          , người đã có hơn 16 năm xây dựng sản phẩm. Ông sáng lập và điều hành một
          công ty sửa chữa điện thoại thông minh ở Tây Ban Nha từ năm 2009 cho đến
          khi bán nó vào năm 2025. Đầu năm 2026, ông tạo ra career-ops để sắp xếp
          chính đợt tìm việc của mình trong thời đại AI, và phát hành mã nguồn mở
          theo giấy phép MIT khi không còn cần đến nó nữa. Đến lúc đó, ông đã đánh
          giá 740 tin tuyển dụng và nhận được vị trí Head of Applied AI. Sáu tháng
          sau, ông rời vị trí đó để toàn thời gian phát triển career-ops.
        </>
      ),
    },
    {
      q: 'career-ops là một skill của Claude Code hay một công cụ độc lập?',
      a: (
        <>
          career-ops không phụ thuộc vào một CLI cụ thể. Nó chạy với Claude Code,
          OpenCode, Codex, GitHub Copilot và nhiều CLI khác: chính tác tử lập trình
          AI mà bạn vốn đã trả tiền. Các tệp skill (
          <code className="font-mono text-fd-foreground">modes/</code>) nằm trong
          repository dưới dạng prompt Markdown thuần túy; bất kỳ tác tử nào nạp
          được skill đều có thể gọi chúng. Không có phụ thuộc riêng nào vào
          Anthropic. Claude Code là môi trường phổ biến nhất nhờ trình nạp skill
          của nó, nhưng các chế độ này chạy nguyên vẹn trên những CLI khác.
        </>
      ),
    },
    {
      q: 'career-ops khác gì các công cụ chấm CV hay công cụ tự động nộp đơn?',
      a: (
        <>
          career-ops là mã nguồn mở theo giấy phép MIT, chạy cục bộ trên máy của
          bạn thông qua CLI lập trình AI bạn đang dùng, và công bố toàn bộ thang
          đánh giá. Một con người quyết định từng đơn ứng tuyển; career-ops không
          bao giờ tự gửi gì cả. Không có tài khoản, telemetry hay gói đăng ký của
          career-ops; chi phí định kỳ duy nhất là CLI AI bạn chọn. Để xem so sánh
          thẳng thắn, đặt cạnh nhau với từng công cụ cụ thể, hãy xem{' '}
          <a href="/compare" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/compare
          </a>
          .
        </>
      ),
    },
    {
      q: 'career-ops chạy được với những công cụ AI nào?',
      a: (
        <>
          career-ops chạy với Claude Code, Cursor, Codex, OpenCode, Pi, Antigravity
          CLI, Grok Build CLI, Qwen, Kimi, Hermes Agent và GitHub Copilot CLI: mười
          một CLI được hỗ trợ đầy đủ (Gemini CLI là một wrapper cũ). Cùng một bộ
          tệp chế độ chạy trên tất cả. Mỗi người chọn CLI phù hợp với gói đăng ký
          đang có và mức chi tiêu mong muốn; career-ops không bao giờ khóa bạn vào
          một nhà cung cấp. Một đợt tìm việc điển hình chạy được với Claude Pro giá
          20 USD/tháng, nhưng lựa chọn là của bạn.
        </>
      ),
    },
  ],
  finalCta: 'Sẵn sàng sàng lọc tin tuyển dụng, thay vì bị sàng lọc?',
  yourTurn: 'Đến lượt bạn',
  followWhatWeShip: 'Hoặc theo dõi những gì chúng tôi phát hành.',
  releaseBlurb: (
    <>
      Thông báo phát hành và tin tức thỉnh thoảng.
      <br />
      Bạn có thể hủy đăng ký bất cứ lúc nào.
    </>
  ),
};
