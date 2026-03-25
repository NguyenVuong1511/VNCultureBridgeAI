USE VNCultureBridgeAI;
GO

SET NOCOUNT ON;
SET XACT_ABORT ON;
GO

BEGIN TRY
    BEGIN TRAN;

    /* =========================================================
       A. NGUOI DUNG QUAN TRI
       ========================================================= */
    INSERT INTO QUAN_TRI_NGUOI_DUNG
    (
        TenDangNhap, Email, MatKhauHash, HoTen, TrangThai,
        LanDangNhapCuoi, NgayTao, NgayCapNhat
    )
    SELECT v.TenDangNhap, v.Email, v.MatKhauHash, v.HoTen, v.TrangThai,
           v.LanDangNhapCuoi, v.NgayTao, v.NgayCapNhat
    FROM (VALUES
        (N'superadmin',      N'superadmin@vnculturebridge.ai', N'HASH$SUPERADMIN$2026',      N'Nguyễn Quản Trị',      'HOAT_DONG', CAST('2026-03-20T08:00:00' AS DATETIME2(0)), CAST('2026-03-01T08:00:00' AS DATETIME2(0)), CAST('2026-03-20T08:00:00' AS DATETIME2(0))),
        (N'contentadmin',    N'contentadmin@vnculturebridge.ai', N'HASH$CONTENTADMIN$2026', N'Trần Biên Tập',        'HOAT_DONG', CAST('2026-03-19T09:10:00' AS DATETIME2(0)), CAST('2026-03-02T09:00:00' AS DATETIME2(0)), CAST('2026-03-19T09:10:00' AS DATETIME2(0))),
        (N'reviewer01',      N'reviewer01@vnculturebridge.ai', N'HASH$REVIEWER$2026',       N'Lê Kiểm Duyệt',        'HOAT_DONG', CAST('2026-03-21T10:30:00' AS DATETIME2(0)), CAST('2026-03-03T10:00:00' AS DATETIME2(0)), CAST('2026-03-21T10:30:00' AS DATETIME2(0))),
        (N'aiadmin01',       N'aiadmin01@vnculturebridge.ai', N'HASH$AIADMIN$2026',         N'Phạm AI Ops',          'HOAT_DONG', CAST('2026-03-18T15:00:00' AS DATETIME2(0)), CAST('2026-03-04T15:00:00' AS DATETIME2(0)), CAST('2026-03-18T15:00:00' AS DATETIME2(0))),
        (N'analyst01',       N'analyst01@vnculturebridge.ai', N'HASH$ANALYST$2026',         N'Hoàng Phân Tích',      'HOAT_DONG', CAST('2026-03-17T16:20:00' AS DATETIME2(0)), CAST('2026-03-05T16:00:00' AS DATETIME2(0)), CAST('2026-03-17T16:20:00' AS DATETIME2(0))),
        (N'translator01',    N'translator01@vnculturebridge.ai', N'HASH$TRANSLATOR$2026',   N'Vũ Dịch Thuật',        'HOAT_DONG', CAST('2026-03-16T13:15:00' AS DATETIME2(0)), CAST('2026-03-06T13:00:00' AS DATETIME2(0)), CAST('2026-03-16T13:15:00' AS DATETIME2(0)))
    ) v(TenDangNhap, Email, MatKhauHash, HoTen, TrangThai, LanDangNhapCuoi, NgayTao, NgayCapNhat)
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM QUAN_TRI_NGUOI_DUNG u
        WHERE u.Email = v.Email
           OR u.TenDangNhap = v.TenDangNhap
    );

    INSERT INTO QUAN_TRI_NGUOI_DUNG_VAI_TRO
    (
        IDNguoiDung, IDVaiTro, NgayGan, IDNguoiGan
    )
    SELECT
        u.IDNguoiDung,
        r.IDVaiTro,
        CAST('2026-03-10T08:00:00' AS DATETIME2(0)),
        su.IDNguoiDung
    FROM (VALUES
        (N'superadmin',   'SUPER_ADMIN'),
        (N'contentadmin', 'CONTENT_ADMIN'),
        (N'reviewer01',   'REVIEWER'),
        (N'aiadmin01',    'AI_ADMIN'),
        (N'analyst01',    'ANALYST')
    ) v(TenDangNhap, MaVaiTro)
    INNER JOIN QUAN_TRI_NGUOI_DUNG u ON u.TenDangNhap = v.TenDangNhap
    INNER JOIN QUAN_TRI_VAI_TRO r ON r.MaVaiTro = v.MaVaiTro
    INNER JOIN QUAN_TRI_NGUOI_DUNG su ON su.TenDangNhap = N'superadmin'
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM QUAN_TRI_NGUOI_DUNG_VAI_TRO x
        WHERE x.IDNguoiDung = u.IDNguoiDung
          AND x.IDVaiTro = r.IDVaiTro
    );

    /* =========================================================
       B. DAN TOC
       ========================================================= */
    INSERT INTO DAN_TOC (MaDanToc, ThuTuSapXep, HoatDong, NgayTao)
    SELECT v.MaDanToc, v.ThuTuSapXep, 1, CAST('2026-03-10T08:00:00' AS DATETIME2(0))
    FROM (VALUES
        ('KINH', 1),
        ('TAY', 2),
        ('HMONG', 3),
        ('EDE', 4),
        ('CHAM', 5),
        ('KHMER', 6)
    ) v(MaDanToc, ThuTuSapXep)
    WHERE NOT EXISTS
    (
        SELECT 1 FROM DAN_TOC d WHERE d.MaDanToc = v.MaDanToc
    );

    INSERT INTO DAN_TOC_BAN_DICH (IDDanToc, MaNgonNgu, TenDanToc, MoTa)
    SELECT d.IDDanToc, v.MaNgonNgu, v.TenDanToc, v.MoTa
    FROM DAN_TOC d
    INNER JOIN (VALUES
        ('KINH',  'vi', N'Kinh',   N'Dân tộc chiếm đa số tại Việt Nam.'),
        ('KINH',  'en', N'Kinh',   N'The majority ethnic group in Vietnam.'),
        ('TAY',   'vi', N'Tày',    N'Một trong những dân tộc có cộng đồng lớn ở vùng núi phía Bắc.'),
        ('TAY',   'en', N'Tay',    N'One of the major ethnic communities in northern mountainous Vietnam.'),
        ('HMONG', 'vi', N'H''Mông',N'Dân tộc sinh sống nhiều ở vùng núi cao phía Bắc.'),
        ('HMONG', 'en', N'H''Mong',N'An ethnic group living mainly in the northern highlands of Vietnam.'),
        ('EDE',   'vi', N'Ê Đê',   N'Dân tộc tiêu biểu của khu vực Tây Nguyên.'),
        ('EDE',   'en', N'Ede',    N'A representative ethnic group of the Central Highlands.'),
        ('CHAM',  'vi', N'Chăm',   N'Dân tộc có bề dày lịch sử và văn hoá đặc sắc ở miền Trung.'),
        ('CHAM',  'en', N'Cham',   N'An ethnic group with a rich cultural and historical heritage in Central Vietnam.'),
        ('KHMER', 'vi', N'Khmer',  N'Dân tộc có cộng đồng đông ở Nam Bộ, đặc biệt ở đồng bằng sông Cửu Long.'),
        ('KHMER', 'en', N'Khmer',  N'An ethnic group with a large community in Southern Vietnam, especially in the Mekong Delta.')
    ) v(MaDanToc, MaNgonNgu, TenDanToc, MoTa)
        ON d.MaDanToc = v.MaDanToc
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM DAN_TOC_BAN_DICH x
        WHERE x.IDDanToc = d.IDDanToc
          AND x.MaNgonNgu = v.MaNgonNgu
    );

    /* =========================================================
       C. THE NOI DUNG
       ========================================================= */
    INSERT INTO THE_NOI_DUNG (MaThe, HoatDong, NgayTao)
    SELECT v.MaThe, 1, CAST('2026-03-10T08:30:00' AS DATETIME2(0))
    FROM (VALUES
        ('DI_SAN'),
        ('NGHI_LE'),
        ('AM_THUC_TRUYEN_THONG'),
        ('TRANG_PHUC_TRUYEN_THONG'),
        ('LE_HOI_DAN_GIAN'),
        ('NGHE_THUAT_TRINH_DIEN')
    ) v(MaThe)
    WHERE NOT EXISTS
    (
        SELECT 1 FROM THE_NOI_DUNG t WHERE t.MaThe = v.MaThe
    );

    INSERT INTO THE_NOI_DUNG_BAN_DICH (IDThe, MaNgonNgu, TenThe, MoTa)
    SELECT t.IDThe, v.MaNgonNgu, v.TenThe, v.MoTa
    FROM THE_NOI_DUNG t
    INNER JOIN (VALUES
        ('DI_SAN',                'vi', N'Di sản',                  N'Nội dung liên quan đến di sản văn hoá.'),
        ('DI_SAN',                'en', N'Heritage',               N'Content related to cultural heritage.'),
        ('NGHI_LE',               'vi', N'Nghi lễ',                N'Nội dung liên quan đến nghi lễ và thực hành tín ngưỡng.'),
        ('NGHI_LE',               'en', N'Ritual',                 N'Content related to rituals and spiritual practices.'),
        ('AM_THUC_TRUYEN_THONG',  'vi', N'Ẩm thực truyền thống',   N'Nội dung về món ăn và tập quán ẩm thực.'),
        ('AM_THUC_TRUYEN_THONG',  'en', N'Traditional Cuisine',    N'Content about cuisine and traditional eating practices.'),
        ('TRANG_PHUC_TRUYEN_THONG','vi',N'Trang phục truyền thống',N'Nội dung về trang phục truyền thống.'),
        ('TRANG_PHUC_TRUYEN_THONG','en',N'Traditional Clothing',   N'Content about traditional clothing.'),
        ('LE_HOI_DAN_GIAN',       'vi', N'Lễ hội dân gian',        N'Nội dung về các lễ hội truyền thống.'),
        ('LE_HOI_DAN_GIAN',       'en', N'Folk Festival',          N'Content about traditional festivals.'),
        ('NGHE_THUAT_TRINH_DIEN', 'vi', N'Nghệ thuật trình diễn',  N'Nội dung về âm nhạc, múa và trình diễn dân gian.'),
        ('NGHE_THUAT_TRINH_DIEN', 'en', N'Performing Arts',        N'Content about music, dance and folk performance.')
    ) v(MaThe, MaNgonNgu, TenThe, MoTa)
        ON t.MaThe = v.MaThe
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM THE_NOI_DUNG_BAN_DICH x
        WHERE x.IDThe = t.IDThe
          AND x.MaNgonNgu = v.MaNgonNgu
    );

    /* =========================================================
       D. TU KHOA
       ========================================================= */
    INSERT INTO TU_KHOA (MaTuKhoa, HoatDong, NgayTao)
    SELECT v.MaTuKhoa, 1, CAST('2026-03-10T08:45:00' AS DATETIME2(0))
    FROM (VALUES
        ('TET_NGUYEN_DAN'),
        ('CONG_CHIENG'),
        ('AO_DAI'),
        ('UNESCO'),
        ('NGHI_LE_DAU_NAM'),
        ('BAN_SAC_VAN_HOA')
    ) v(MaTuKhoa)
    WHERE NOT EXISTS
    (
        SELECT 1 FROM TU_KHOA k WHERE k.MaTuKhoa = v.MaTuKhoa
    );

    INSERT INTO TU_KHOA_BAN_DICH (IDTuKhoa, MaNgonNgu, TuKhoaHienThi)
    SELECT k.IDTuKhoa, v.MaNgonNgu, v.TuKhoaHienThi
    FROM TU_KHOA k
    INNER JOIN (VALUES
        ('TET_NGUYEN_DAN', 'vi', N'Tết Nguyên Đán'),
        ('TET_NGUYEN_DAN', 'en', N'Tet Holiday'),
        ('CONG_CHIENG',    'vi', N'Cồng chiêng'),
        ('CONG_CHIENG',    'en', N'Gong Culture'),
        ('AO_DAI',         'vi', N'Áo dài'),
        ('AO_DAI',         'en', N'Ao Dai'),
        ('UNESCO',         'vi', N'UNESCO'),
        ('UNESCO',         'en', N'UNESCO'),
        ('NGHI_LE_DAU_NAM','vi', N'Nghi lễ đầu năm'),
        ('NGHI_LE_DAU_NAM','en', N'New Year Ritual'),
        ('BAN_SAC_VAN_HOA','vi', N'Bản sắc văn hoá'),
        ('BAN_SAC_VAN_HOA','en', N'Cultural Identity')
    ) v(MaTuKhoa, MaNgonNgu, TuKhoaHienThi)
        ON k.MaTuKhoa = v.MaTuKhoa
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM TU_KHOA_BAN_DICH x
        WHERE x.IDTuKhoa = k.IDTuKhoa
          AND x.MaNgonNgu = v.MaNgonNgu
    );

    /* =========================================================
       E. NGUON THAM KHAO
       ========================================================= */
    INSERT INTO NGUON_THAM_KHAO
    (
        LoaiNguon, TieuDeNguon, TacGia, NhaXuatBan, NamXuatBan,
        URLNguon, ISBN, DOI, MaNgonNguNguon, GhiChu,
        MucDoTinCay, DaXacMinh, IDNguoiXacMinh, NgayXacMinh, NgayTao
    )
    SELECT
        v.LoaiNguon, v.TieuDeNguon, v.TacGia, v.NhaXuatBan, v.NamXuatBan,
        v.URLNguon, v.ISBN, v.DOI, v.MaNgonNguNguon, v.GhiChu,
        v.MucDoTinCay, v.DaXacMinh, q.IDNguoiDung, v.NgayXacMinh, v.NgayTao
    FROM (VALUES
        ('WEBSITE', N'Hồ sơ di sản Không gian văn hoá Cồng chiêng Tây Nguyên', N'UNESCO', N'UNESCO', 2005, N'https://ich.unesco.org/', NULL, NULL, 'en', N'Tài liệu tham khảo chính thức về di sản.', 5, 1, CAST('2026-03-12T10:00:00' AS DATETIME2(0)), CAST('2026-03-12T09:00:00' AS DATETIME2(0))),
        ('TAI_LIEU_NHA_NUOC', N'Tết cổ truyền của dân tộc Việt Nam', N'Bộ Văn hoá, Thể thao và Du lịch', N'Bộ VHTTDL', 2024, N'https://bvhttdl.gov.vn/', NULL, NULL, 'vi', N'Tổng hợp thông tin chính thống phục vụ biên tập.', 5, 1, CAST('2026-03-12T10:10:00' AS DATETIME2(0)), CAST('2026-03-12T09:10:00' AS DATETIME2(0))),
        ('SACH', N'Văn hoá Việt Nam - Tìm tòi và suy ngẫm', N'Trần Quốc Vượng', N'Nhà xuất bản Văn hoá Dân tộc', 2010, NULL, N'9786047000001', NULL, 'vi', N'Sách nền tảng về văn hoá Việt Nam.', 4, 1, CAST('2026-03-12T10:20:00' AS DATETIME2(0)), CAST('2026-03-12T09:20:00' AS DATETIME2(0))),
        ('BAI_BAO', N'Áo dài Việt Nam trong đời sống đương đại', N'Nguyễn Thị Minh', N'Tạp chí Văn hoá Nghệ thuật', 2022, N'https://vanhoanghethuat.vn/', NULL, NULL, 'vi', N'Tư liệu phục vụ bài viết về áo dài.', 4, 1, CAST('2026-03-12T10:30:00' AS DATETIME2(0)), CAST('2026-03-12T09:30:00' AS DATETIME2(0)))
    ) v(LoaiNguon, TieuDeNguon, TacGia, NhaXuatBan, NamXuatBan, URLNguon, ISBN, DOI, MaNgonNguNguon, GhiChu, MucDoTinCay, DaXacMinh, NgayXacMinh, NgayTao)
    CROSS JOIN
    (
        SELECT IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'reviewer01'
    ) q
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM NGUON_THAM_KHAO n
        WHERE n.TieuDeNguon = v.TieuDeNguon
    );

    /* =========================================================
       F. BAI VIET
       ========================================================= */
    INSERT INTO BAI_VIET
    (
        DuongDanSeo, MaNgonNguGoc, LoaiBaiViet, TrangThai,
        CapDoNhayCam, MucDoKiemDuyet, NoiDungNoiBat,
        CanDongBoAI, TrangThaiDongBoAI, GhiChuBienTap,
        IDNguoiTao, IDNguoiCapNhat, NgayTao, NgayCapNhat
    )
    SELECT
        v.DuongDanSeo, v.MaNgonNguGoc, v.LoaiBaiViet, v.TrangThai,
        v.CapDoNhayCam, v.MucDoKiemDuyet, v.NoiDungNoiBat,
        v.CanDongBoAI, v.TrangThaiDongBoAI, v.GhiChuBienTap,
        nguoiTao.IDNguoiDung, nguoiCapNhat.IDNguoiDung, v.NgayTao, v.NgayCapNhat
    FROM (VALUES
        (N'tet-nguyen-dan-viet-nam',                         'vi', 'LE_HOI',              'NHAP', 2, 'THUONG', 1, 1, 'CHO_DONG_BO', N'Bài viết mẫu về Tết Nguyên Đán.',                                  CAST('2026-03-13T08:00:00' AS DATETIME2(0)), CAST('2026-03-13T08:00:00' AS DATETIME2(0))),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen',      'vi', 'NGHE_THUAT_DAN_GIAN', 'NHAP', 2, 'THUONG', 1, 1, 'CHO_DONG_BO', N'Bài viết mẫu về không gian văn hoá cồng chiêng Tây Nguyên.',      CAST('2026-03-13T09:00:00' AS DATETIME2(0)), CAST('2026-03-13T09:00:00' AS DATETIME2(0))),
        (N'ao-dai-viet-nam',                                'vi', 'TRANG_PHUC',          'NHAP', 1, 'THUONG', 0, 1, 'CHO_DONG_BO', N'Bài viết mẫu về áo dài Việt Nam.',                                 CAST('2026-03-13T10:00:00' AS DATETIME2(0)), CAST('2026-03-13T10:00:00' AS DATETIME2(0)))
    ) v(DuongDanSeo, MaNgonNguGoc, LoaiBaiViet, TrangThai, CapDoNhayCam, MucDoKiemDuyet, NoiDungNoiBat, CanDongBoAI, TrangThaiDongBoAI, GhiChuBienTap, NgayTao, NgayCapNhat)
    CROSS JOIN (SELECT IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'contentadmin') nguoiTao
    CROSS JOIN (SELECT IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'contentadmin') nguoiCapNhat
    WHERE NOT EXISTS
    (
        SELECT 1 FROM BAI_VIET b WHERE b.DuongDanSeo = v.DuongDanSeo
    );

    /* =========================================================
       G. BAI VIET BAN DICH
       ========================================================= */
    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc,
        LaBanDichMay, TrangThaiBanDich, IDNguoiSoat, NgaySoat,
        GhiChuDichGia, NgayTao, NgayCapNhat
    )
    SELECT
        b.IDBaiViet, v.MaNgonNgu, v.TieuDe, v.TomTat, v.GioiThieu, v.NguonGoc,
        v.YNghiaVanHoa, v.BoiCanhSuDung, v.NoiDungChiTiet, v.GhiChuCultureShock,
        v.TieuDeSEO, v.MoTaSEO, v.SoPhutDoc,
        v.LaBanDichMay, v.TrangThaiBanDich, r.IDNguoiDung, v.NgaySoat,
        v.GhiChuDichGia, v.NgayTao, v.NgayCapNhat
    FROM BAI_VIET b
    INNER JOIN (VALUES
        /* tet-nguyen-dan-viet-nam */
        (N'tet-nguyen-dan-viet-nam', 'vi', N'Tết Nguyên Đán Việt Nam', N'Lễ tết truyền thống quan trọng nhất của người Việt.',
         N'Tết Nguyên Đán đánh dấu thời khắc chuyển giao năm cũ sang năm mới theo âm lịch.',
         N'Tết bắt nguồn từ chu kỳ nông nghiệp và tín ngưỡng thờ cúng tổ tiên.',
         N'Tết thể hiện tinh thần đoàn viên, tri ân tổ tiên và khởi đầu mới.',
         N'Diễn ra vào dịp đầu năm âm lịch trong gia đình và cộng đồng.',
         N'Người Việt dọn dẹp nhà cửa, cúng ông Công ông Táo, tất niên, giao thừa, chúc Tết, mừng tuổi và du xuân. Tết còn gắn với mâm cỗ, bánh chưng, hoa đào, hoa mai và các nghi thức cầu may đầu năm.',
         N'Du khách quốc tế có thể thấy nhiều nghi thức mang tính gia đình và tâm linh, cần tôn trọng không gian thờ cúng và cách chúc Tết.',
         N'Tet Nguyen Dan Viet Nam', N'Khám phá ý nghĩa, nguồn gốc và phong tục Tết Nguyên Đán Việt Nam.', 8, 0, 'DA_DUYET',
         CAST('2026-03-14T09:00:00' AS DATETIME2(0)), N'Đã soát nội dung tiếng Việt.', CAST('2026-03-13T12:00:00' AS DATETIME2(0)), CAST('2026-03-14T09:00:00' AS DATETIME2(0))),
        (N'tet-nguyen-dan-viet-nam', 'en', N'Vietnamese Lunar New Year (Tet)', N'The most important traditional New Year celebration in Vietnam.',
         N'Tet marks the transition from the old lunar year to the new one.',
         N'Its roots are associated with agrarian cycles and ancestor worship.',
         N'Tet embodies reunion, gratitude to ancestors and hopes for a new beginning.',
         N'Observed at the beginning of the lunar year in homes and communities.',
         N'Vietnamese families clean their homes, prepare year-end meals, perform ancestor worship, welcome New Year''s Eve, exchange greetings and lucky money, and visit relatives and temples.',
         N'International visitors should respect family altars, ritual timing and local greeting etiquette during Tet.',
         N'Vietnamese Lunar New Year Tet', N'Learn about the meaning, origin and customs of Vietnamese Lunar New Year.', 7, 0, 'DA_DUYET',
         CAST('2026-03-14T09:15:00' AS DATETIME2(0)), N'English version reviewed.', CAST('2026-03-13T12:10:00' AS DATETIME2(0)), CAST('2026-03-14T09:15:00' AS DATETIME2(0))),

        /* cong chieng */
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'vi', N'Không gian văn hoá Cồng chiêng Tây Nguyên', N'Di sản văn hoá phi vật thể tiêu biểu của các cộng đồng Tây Nguyên.',
         N'Cồng chiêng không chỉ là nhạc cụ mà còn là biểu tượng văn hoá cộng đồng.',
         N'Không gian văn hoá cồng chiêng hình thành trong đời sống nghi lễ, lễ hội và sinh hoạt cộng đồng của nhiều dân tộc Tây Nguyên.',
         N'Di sản thể hiện mối liên kết giữa con người, cộng đồng và thế giới tâm linh.',
         N'Cồng chiêng xuất hiện trong lễ mừng lúa mới, bỏ mả, cưới hỏi và nhiều dịp cộng đồng khác.',
         N'Mỗi bộ cồng chiêng có giá trị biểu tượng và âm nhạc riêng. Nghệ nhân giữ vai trò quan trọng trong truyền dạy kỹ năng diễn tấu và gìn giữ nghi lễ liên quan.',
         N'Không nên coi cồng chiêng chỉ là tiết mục biểu diễn sân khấu, vì nó gắn với bối cảnh thiêng và tập quán cộng đồng.',
         N'Khong gian van hoa Cong Chieng Tay Nguyen', N'Tìm hiểu giá trị di sản cồng chiêng Tây Nguyên trong đời sống cộng đồng.', 9, 0, 'DA_DUYET',
         CAST('2026-03-14T10:00:00' AS DATETIME2(0)), N'Đã rà soát kỹ nội dung di sản.', CAST('2026-03-13T13:00:00' AS DATETIME2(0)), CAST('2026-03-14T10:00:00' AS DATETIME2(0))),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'en', N'The Cultural Space of Gong Culture in the Central Highlands', N'A representative intangible cultural heritage of communities in the Central Highlands of Vietnam.',
         N'Gongs are not merely musical instruments but symbols of communal identity.',
         N'This cultural space emerged from ritual life, festivals and community practices of many Central Highlands ethnic groups.',
         N'It reflects the bond between people, community life and the spiritual world.',
         N'Gongs are played during harvest celebrations, funerary rites, weddings and other communal events.',
         N'Each gong set carries symbolic and musical value. Local artisans and elders play a central role in teaching performance skills and preserving related rituals.',
         N'Visitors should understand that gong culture is deeply tied to sacred and communal contexts, not just stage performance.',
         N'Gong Culture Central Highlands', N'Explore the heritage value of gong culture in Vietnam''s Central Highlands.', 8, 0, 'DA_DUYET',
         CAST('2026-03-14T10:15:00' AS DATETIME2(0)), N'English version reviewed.', CAST('2026-03-13T13:10:00' AS DATETIME2(0)), CAST('2026-03-14T10:15:00' AS DATETIME2(0))),

        /* ao dai */
        (N'ao-dai-viet-nam', 'vi', N'Áo dài Việt Nam', N'Trang phục truyền thống gắn với vẻ đẹp thanh lịch và bản sắc Việt.',
         N'Áo dài là biểu tượng quen thuộc của văn hoá và thời trang Việt Nam.',
         N'Trang phục này hình thành và biến đổi qua nhiều giai đoạn lịch sử.',
         N'Áo dài thể hiện sự duyên dáng, kín đáo và khả năng thích ứng của văn hoá Việt.',
         N'Áo dài được mặc trong lễ cưới, trường học, sự kiện ngoại giao và lễ hội.',
         N'Qua thời gian, áo dài có nhiều biến thể về chất liệu, màu sắc và kiểu dáng nhưng vẫn giữ cấu trúc cơ bản gồm thân áo dài và quần. Trong đời sống đương đại, áo dài vừa mang giá trị truyền thống vừa là biểu tượng nhận diện quốc gia.',
         N'Một số người nước ngoài dễ hiểu nhầm áo dài là trang phục mặc hằng ngày của mọi người Việt, trong khi trên thực tế nó thường xuất hiện ở dịp đặc biệt hoặc môi trường đặc thù.',
         N'Ao dai Viet Nam', N'Tìm hiểu nguồn gốc, ý nghĩa và vai trò của áo dài Việt Nam.', 7, 0, 'DA_SOAT',
         CAST('2026-03-14T11:00:00' AS DATETIME2(0)), N'Đã soát, chờ duyệt cuối.', CAST('2026-03-13T14:00:00' AS DATETIME2(0)), CAST('2026-03-14T11:00:00' AS DATETIME2(0))),
        (N'ao-dai-viet-nam', 'en', N'Vietnamese Ao Dai', N'A traditional garment associated with elegance and Vietnamese identity.',
         N'The ao dai is one of the best-known symbols of Vietnamese culture and fashion.',
         N'It has evolved through different historical periods.',
         N'The ao dai represents elegance, modesty and cultural continuity.',
         N'It is commonly worn at weddings, schools, diplomatic events and festivals.',
         N'Over time, the ao dai has developed different materials, colors and tailoring styles while preserving its recognizable long tunic form paired with trousers. In modern life, it functions both as traditional attire and a national cultural symbol.',
         N'Some foreign visitors may assume the ao dai is everyday clothing for all Vietnamese people, while it is more commonly worn on special occasions or in specific settings.',
         N'Vietnamese Ao Dai', N'Learn about the origin, meaning and role of the Vietnamese ao dai.', 6, 0, 'DA_SOAT',
         CAST('2026-03-14T11:10:00' AS DATETIME2(0)), N'English version reviewed but not yet approved for publishing.', CAST('2026-03-13T14:10:00' AS DATETIME2(0)), CAST('2026-03-14T11:10:00' AS DATETIME2(0)))
    ) v(DuongDanSeo, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc, YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock, TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay, TrangThaiBanDich, NgaySoat, GhiChuDichGia, NgayTao, NgayCapNhat)
        ON b.DuongDanSeo = v.DuongDanSeo
    CROSS JOIN (SELECT IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'reviewer01') r
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM BAI_VIET_BAN_DICH bd
        WHERE bd.IDBaiViet = b.IDBaiViet
          AND bd.MaNgonNgu = v.MaNgonNgu
    );

    /* =========================================================
       H. GAN DANH MUC / VUNG / DAN TOC / THE / TU KHOA
       ========================================================= */
    INSERT INTO BAI_VIET_DANH_MUC (IDBaiViet, IDDanhMuc, LaDanhMucChinh)
    SELECT b.IDBaiViet, dm.IDDanhMuc, v.LaDanhMucChinh
    FROM (VALUES
        (N'tet-nguyen-dan-viet-nam',                    'LE_HOI',               1),
        (N'tet-nguyen-dan-viet-nam',                    'PHONG_TUC',            0),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'NGHE_THUAT_DAN_GIAN',  1),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'BIEU_TUONG_VAN_HOA',   0),
        (N'ao-dai-viet-nam',                           'TRANG_PHUC',           1)
    ) v(DuongDanSeo, MaDanhMuc, LaDanhMucChinh)
    INNER JOIN BAI_VIET b ON b.DuongDanSeo = v.DuongDanSeo
    INNER JOIN DANH_MUC_CHU_DE dm ON dm.MaDanhMuc = v.MaDanhMuc
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM BAI_VIET_DANH_MUC x
        WHERE x.IDBaiViet = b.IDBaiViet
          AND x.IDDanhMuc = dm.IDDanhMuc
    );

    INSERT INTO BAI_VIET_VUNG_VAN_HOA (IDBaiViet, IDVung, LoaiLienHe)
    SELECT b.IDBaiViet, vv.IDVung, v.LoaiLienHe
    FROM (VALUES
        (N'tet-nguyen-dan-viet-nam',                    'MIEN_BAC',     'PHO_BIEN'),
        (N'tet-nguyen-dan-viet-nam',                    'MIEN_TRUNG',   'PHO_BIEN'),
        (N'tet-nguyen-dan-viet-nam',                    'MIEN_NAM',     'PHO_BIEN'),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'TAY_NGUYEN',   'NGUON_GOC'),
        (N'ao-dai-viet-nam',                           'MIEN_TRUNG',   'LIEN_QUAN'),
        (N'ao-dai-viet-nam',                           'MIEN_NAM',     'PHO_BIEN')
    ) v(DuongDanSeo, MaVung, LoaiLienHe)
    INNER JOIN BAI_VIET b ON b.DuongDanSeo = v.DuongDanSeo
    INNER JOIN VUNG_VAN_HOA vv ON vv.MaVung = v.MaVung
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM BAI_VIET_VUNG_VAN_HOA x
        WHERE x.IDBaiViet = b.IDBaiViet
          AND x.IDVung = vv.IDVung
    );

    INSERT INTO BAI_VIET_DAN_TOC (IDBaiViet, IDDanToc, LoaiLienHe)
    SELECT b.IDBaiViet, dt.IDDanToc, v.LoaiLienHe
    FROM (VALUES
        (N'tet-nguyen-dan-viet-nam',                    'KINH',  'PHO_BIEN'),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'EDE',   'THUC_HANH'),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'HMONG', 'LIEN_QUAN'),
        (N'ao-dai-viet-nam',                           'KINH',  'LIEN_QUAN'),
        (N'ao-dai-viet-nam',                           'CHAM',  'LIEN_QUAN')
    ) v(DuongDanSeo, MaDanToc, LoaiLienHe)
    INNER JOIN BAI_VIET b ON b.DuongDanSeo = v.DuongDanSeo
    INNER JOIN DAN_TOC dt ON dt.MaDanToc = v.MaDanToc
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM BAI_VIET_DAN_TOC x
        WHERE x.IDBaiViet = b.IDBaiViet
          AND x.IDDanToc = dt.IDDanToc
    );

    INSERT INTO BAI_VIET_THE (IDBaiViet, IDThe)
    SELECT b.IDBaiViet, t.IDThe
    FROM (VALUES
        (N'tet-nguyen-dan-viet-nam',                    'DI_SAN'),
        (N'tet-nguyen-dan-viet-nam',                    'NGHI_LE'),
        (N'tet-nguyen-dan-viet-nam',                    'LE_HOI_DAN_GIAN'),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'DI_SAN'),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'NGHE_THUAT_TRINH_DIEN'),
        (N'ao-dai-viet-nam',                           'TRANG_PHUC_TRUYEN_THONG')
    ) v(DuongDanSeo, MaThe)
    INNER JOIN BAI_VIET b ON b.DuongDanSeo = v.DuongDanSeo
    INNER JOIN THE_NOI_DUNG t ON t.MaThe = v.MaThe
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM BAI_VIET_THE x
        WHERE x.IDBaiViet = b.IDBaiViet
          AND x.IDThe = t.IDThe
    );

    INSERT INTO BAI_VIET_TU_KHOA (IDBaiViet, IDTuKhoa)
    SELECT b.IDBaiViet, k.IDTuKhoa
    FROM (VALUES
        (N'tet-nguyen-dan-viet-nam',                    'TET_NGUYEN_DAN'),
        (N'tet-nguyen-dan-viet-nam',                    'NGHI_LE_DAU_NAM'),
        (N'tet-nguyen-dan-viet-nam',                    'BAN_SAC_VAN_HOA'),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'CONG_CHIENG'),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'UNESCO'),
        (N'ao-dai-viet-nam',                           'AO_DAI'),
        (N'ao-dai-viet-nam',                           'BAN_SAC_VAN_HOA')
    ) v(DuongDanSeo, MaTuKhoa)
    INNER JOIN BAI_VIET b ON b.DuongDanSeo = v.DuongDanSeo
    INNER JOIN TU_KHOA k ON k.MaTuKhoa = v.MaTuKhoa
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM BAI_VIET_TU_KHOA x
        WHERE x.IDBaiViet = b.IDBaiViet
          AND x.IDTuKhoa = k.IDTuKhoa
    );

    /* =========================================================
       I. GAN NGUON THAM KHAO CHO BAI VIET
       ========================================================= */
    INSERT INTO BAI_VIET_NGUON_THAM_KHAO
    (
        IDBaiViet, IDNguon, GhiChuTrichDan, TrangTu, TrangDen, LaNguonChinh
    )
    SELECT b.IDBaiViet, n.IDNguon, v.GhiChuTrichDan, v.TrangTu, v.TrangDen, v.LaNguonChinh
    FROM (VALUES
        (N'tet-nguyen-dan-viet-nam',                    N'Tết cổ truyền của dân tộc Việt Nam',                          N'Nguồn chính về phong tục Tết.',             NULL, NULL, 1),
        (N'tet-nguyen-dan-viet-nam',                    N'Văn hoá Việt Nam - Tìm tòi và suy ngẫm',                      N'Bổ sung bối cảnh văn hoá và lịch sử.',      120, 128, 0),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', N'Hồ sơ di sản Không gian văn hoá Cồng chiêng Tây Nguyên',      N'Nguồn chính về di sản cồng chiêng.',        NULL, NULL, 1),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', N'Văn hoá Việt Nam - Tìm tòi và suy ngẫm',                      N'Tham khảo bổ sung về không gian văn hoá.',  210, 218, 0),
        (N'ao-dai-viet-nam',                            N'Áo dài Việt Nam trong đời sống đương đại',                    N'Nguồn chính về áo dài hiện đại.',           NULL, NULL, 1),
        (N'ao-dai-viet-nam',                            N'Văn hoá Việt Nam - Tìm tòi và suy ngẫm',                      N'Bổ sung bối cảnh giá trị biểu tượng.',      88, 94, 0)
    ) v(DuongDanSeo, TieuDeNguon, GhiChuTrichDan, TrangTu, TrangDen, LaNguonChinh)
    INNER JOIN BAI_VIET b ON b.DuongDanSeo = v.DuongDanSeo
    INNER JOIN NGUON_THAM_KHAO n ON n.TieuDeNguon = v.TieuDeNguon
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM BAI_VIET_NGUON_THAM_KHAO x
        WHERE x.IDBaiViet = b.IDBaiViet
          AND x.IDNguon = n.IDNguon
    );

    /* =========================================================
       J. MEDIA
       ========================================================= */
    INSERT INTO MEDIA
    (
        LoaiMedia, TenTep, DuongDanTep, NhaCungCapLuuTru, MimeType,
        KichThuocBytes, RongPx, CaoPx, ThoiLuongGiay,
        ChuSoHuuBanQuyen, ThongTinGiayPhep, TrangThai,
        IDNguoiTaiLen, NgayTao, NgayCapNhat
    )
    SELECT
        v.LoaiMedia, v.TenTep, v.DuongDanTep, v.NhaCungCapLuuTru, v.MimeType,
        v.KichThuocBytes, v.RongPx, v.CaoPx, v.ThoiLuongGiay,
        v.ChuSoHuuBanQuyen, v.ThongTinGiayPhep, v.TrangThai,
        u.IDNguoiDung, v.NgayTao, v.NgayCapNhat
    FROM (VALUES
        ('HINH_ANH', N'tet-nguyen-dan-hero.jpg',        N'/media/images/tet-nguyen-dan-hero.jpg',        N'LocalStorage', N'image/jpeg', 350000, 1920, 1080, NULL, N'VNCultureBridgeAI', N'Internal editorial use', 'NHAP', CAST('2026-03-13T16:00:00' AS DATETIME2(0)), CAST('2026-03-13T16:00:00' AS DATETIME2(0))),
        ('HINH_ANH', N'cong-chieng-tay-nguyen.jpg',     N'/media/images/cong-chieng-tay-nguyen.jpg',     N'LocalStorage', N'image/jpeg', 410000, 1920, 1080, NULL, N'VNCultureBridgeAI', N'Internal editorial use', 'NHAP', CAST('2026-03-13T16:10:00' AS DATETIME2(0)), CAST('2026-03-13T16:10:00' AS DATETIME2(0))),
        ('HINH_ANH', N'ao-dai-viet-nam.jpg',            N'/media/images/ao-dai-viet-nam.jpg',            N'LocalStorage', N'image/jpeg', 320000, 1600, 1200, NULL, N'VNCultureBridgeAI', N'Internal editorial use', 'NHAP', CAST('2026-03-13T16:20:00' AS DATETIME2(0)), CAST('2026-03-13T16:20:00' AS DATETIME2(0)))
    ) v(LoaiMedia, TenTep, DuongDanTep, NhaCungCapLuuTru, MimeType, KichThuocBytes, RongPx, CaoPx, ThoiLuongGiay, ChuSoHuuBanQuyen, ThongTinGiayPhep, TrangThai, NgayTao, NgayCapNhat)
    CROSS JOIN (SELECT IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'contentadmin') u
    WHERE NOT EXISTS
    (
        SELECT 1 FROM MEDIA m WHERE m.TenTep = v.TenTep
    );

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT m.IDMedia, v.MaNgonNgu, v.VanBanThayThe, v.ChuThich
    FROM MEDIA m
    INNER JOIN (VALUES
        (N'tet-nguyen-dan-hero.jpg',    'vi', N'Gia đình Việt sum họp ngày Tết',             N'Hình minh hoạ không khí sum vầy trong dịp Tết.'),
        (N'tet-nguyen-dan-hero.jpg',    'en', N'Vietnamese family reunion during Tet',       N'Illustration of family reunion during Lunar New Year.'),
        (N'cong-chieng-tay-nguyen.jpg', 'vi', N'Nghệ nhân biểu diễn cồng chiêng Tây Nguyên', N'Hình minh hoạ nghệ nhân trình diễn cồng chiêng.'),
        (N'cong-chieng-tay-nguyen.jpg', 'en', N'Artisans performing gong culture',            N'Illustration of artisans performing gong music in the Central Highlands.'),
        (N'ao-dai-viet-nam.jpg',        'vi', N'Người mẫu mặc áo dài truyền thống',           N'Hình minh hoạ tà áo dài Việt Nam.'),
        (N'ao-dai-viet-nam.jpg',        'en', N'Model wearing traditional ao dai',            N'Illustration of the Vietnamese ao dai.')
    ) v(TenTep, MaNgonNgu, VanBanThayThe, ChuThich)
        ON m.TenTep = v.TenTep
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM MEDIA_BAN_DICH x
        WHERE x.IDMedia = m.IDMedia
          AND x.MaNgonNgu = v.MaNgonNgu
    );

    INSERT INTO BAI_VIET_MEDIA
    (
        IDBaiViet, IDMedia, ThuTuHienThi, LaMediaChinh, NguCanhSuDung
    )
    SELECT b.IDBaiViet, m.IDMedia, v.ThuTuHienThi, v.LaMediaChinh, v.NguCanhSuDung
    FROM (VALUES
        (N'tet-nguyen-dan-viet-nam',                    N'tet-nguyen-dan-hero.jpg',    1, 1, 'ANH_BIA'),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', N'cong-chieng-tay-nguyen.jpg', 1, 1, 'ANH_BIA'),
        (N'ao-dai-viet-nam',                           N'ao-dai-viet-nam.jpg',        1, 1, 'ANH_BIA')
    ) v(DuongDanSeo, TenTep, ThuTuHienThi, LaMediaChinh, NguCanhSuDung)
    INNER JOIN BAI_VIET b ON b.DuongDanSeo = v.DuongDanSeo
    INNER JOIN MEDIA m ON m.TenTep = v.TenTep
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM BAI_VIET_MEDIA x
        WHERE x.IDBaiViet = b.IDBaiViet
          AND x.IDMedia = m.IDMedia
    );

    INSERT INTO MEDIA_VUNG_VAN_HOA (IDMedia, IDVung, ThuTuHienThi)
    SELECT m.IDMedia, vv.IDVung, 1
    FROM (VALUES
        (N'tet-nguyen-dan-hero.jpg',    'MIEN_BAC'),
        (N'cong-chieng-tay-nguyen.jpg', 'TAY_NGUYEN'),
        (N'ao-dai-viet-nam.jpg',        'MIEN_TRUNG')
    ) v(TenTep, MaVung)
    INNER JOIN MEDIA m ON m.TenTep = v.TenTep
    INNER JOIN VUNG_VAN_HOA vv ON vv.MaVung = v.MaVung
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM MEDIA_VUNG_VAN_HOA x
        WHERE x.IDMedia = m.IDMedia
          AND x.IDVung = vv.IDVung
    );

    INSERT INTO MEDIA_DAN_TOC (IDMedia, IDDanToc, ThuTuHienThi)
    SELECT m.IDMedia, dt.IDDanToc, 1
    FROM (VALUES
        (N'tet-nguyen-dan-hero.jpg',    'KINH'),
        (N'cong-chieng-tay-nguyen.jpg', 'EDE'),
        (N'ao-dai-viet-nam.jpg',        'KINH')
    ) v(TenTep, MaDanToc)
    INNER JOIN MEDIA m ON m.TenTep = v.TenTep
    INNER JOIN DAN_TOC dt ON dt.MaDanToc = v.MaDanToc
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM MEDIA_DAN_TOC x
        WHERE x.IDMedia = m.IDMedia
          AND x.IDDanToc = dt.IDDanToc
    );

    UPDATE MEDIA
    SET TrangThai = 'HOAT_DONG'
    WHERE TenTep IN (N'tet-nguyen-dan-hero.jpg', N'cong-chieng-tay-nguyen.jpg', N'ao-dai-viet-nam.jpg')
      AND TrangThai <> 'HOAT_DONG';

    /* =========================================================
       K. BAI VIET LIEN QUAN
       ========================================================= */
    INSERT INTO BAI_VIET_LIEN_QUAN
    (
        IDBaiViet, IDBaiVietLienQuan, LoaiLienKet, TrongSo
    )
    SELECT b1.IDBaiViet, b2.IDBaiViet, v.LoaiLienKet, v.TrongSo
    FROM (VALUES
        (N'tet-nguyen-dan-viet-nam',                    N'ao-dai-viet-nam',                           'GOI_Y',      CAST(0.80 AS DECIMAL(5,2))),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', N'ao-dai-viet-nam',                           'LIEN_QUAN',  CAST(0.60 AS DECIMAL(5,2))),
        (N'ao-dai-viet-nam',                           N'tet-nguyen-dan-viet-nam',                   'CUNG_CHU_DE',CAST(0.70 AS DECIMAL(5,2)))
    ) v(DuongDanSeo, DuongDanSeoLienQuan, LoaiLienKet, TrongSo)
    INNER JOIN BAI_VIET b1 ON b1.DuongDanSeo = v.DuongDanSeo
    INNER JOIN BAI_VIET b2 ON b2.DuongDanSeo = v.DuongDanSeoLienQuan
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM BAI_VIET_LIEN_QUAN x
        WHERE x.IDBaiViet = b1.IDBaiViet
          AND x.IDBaiVietLienQuan = b2.IDBaiViet
          AND x.LoaiLienKet = v.LoaiLienKet
    );

    /* =========================================================
       L. CAP NHAT TRANG THAI BAI VIET
       ========================================================= */
    UPDATE b
    SET
        TrangThai = 'DA_XUAT_BAN',
        NgayDuyet = CAST('2026-03-15T09:00:00' AS DATETIME2(0)),
        IDNguoiDuyet = rv.IDNguoiDung,
        NgayXuatBan = CAST('2026-03-15T10:00:00' AS DATETIME2(0)),
        IDNguoiXuatBan = rv.IDNguoiDung,
        IDNguoiCapNhat = ca.IDNguoiDung
    FROM BAI_VIET b
    CROSS JOIN (SELECT IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'reviewer01') rv
    CROSS JOIN (SELECT IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'contentadmin') ca
    WHERE b.DuongDanSeo = N'tet-nguyen-dan-viet-nam'
      AND b.TrangThai <> 'DA_XUAT_BAN';

    UPDATE b
    SET
        TrangThai = 'DA_XUAT_BAN',
        NgayDuyet = CAST('2026-03-15T11:00:00' AS DATETIME2(0)),
        IDNguoiDuyet = rv.IDNguoiDung,
        NgayXuatBan = CAST('2026-03-15T11:30:00' AS DATETIME2(0)),
        IDNguoiXuatBan = rv.IDNguoiDung,
        IDNguoiCapNhat = ca.IDNguoiDung
    FROM BAI_VIET b
    CROSS JOIN (SELECT IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'reviewer01') rv
    CROSS JOIN (SELECT IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'contentadmin') ca
    WHERE b.DuongDanSeo = N'khong-gian-van-hoa-cong-chieng-tay-nguyen'
      AND b.TrangThai <> 'DA_XUAT_BAN';

    UPDATE b
    SET
        TrangThai = 'DA_DUYET',
        NgayDuyet = CAST('2026-03-15T14:00:00' AS DATETIME2(0)),
        IDNguoiDuyet = rv.IDNguoiDung,
        IDNguoiCapNhat = ca.IDNguoiDung
    FROM BAI_VIET b
    CROSS JOIN (SELECT IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'reviewer01') rv
    CROSS JOIN (SELECT IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'contentadmin') ca
    WHERE b.DuongDanSeo = N'ao-dai-viet-nam'
      AND b.TrangThai = 'NHAP';

    /* =========================================================
       M. PHIEN NGUOI DUNG / NHAT KY TIM KIEM / XEM BAI VIET
       ========================================================= */
    DECLARE @PhienKhach UNIQUEIDENTIFIER = '11111111-1111-1111-1111-111111111111';
    DECLARE @PhienDangNhap UNIQUEIDENTIFIER = '22222222-2222-2222-2222-222222222222';
    DECLARE @PhienChat UNIQUEIDENTIFIER = '33333333-3333-3333-3333-333333333333';

    IF NOT EXISTS (SELECT 1 FROM PHIEN_NGUOI_DUNG WHERE IDPhien = @PhienKhach)
    BEGIN
        INSERT INTO PHIEN_NGUOI_DUNG
        (
            IDPhien, LoaiPhien, MaNgonNguUuTien, MaQuocGiaNguoiDung,
            LoaiThietBi, ThongTinTrinhDuyet, URLGioiThieu,
            DongYPhanTich, BatDauLuc, KetThucLuc
        )
        VALUES
        (
            @PhienKhach, 'KHACH', 'en', 'US',
            N'Mobile', N'Safari iOS', N'https://google.com',
            1, CAST('2026-03-20T08:00:00' AS DATETIME2(0)), CAST('2026-03-20T08:20:00' AS DATETIME2(0))
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM PHIEN_NGUOI_DUNG WHERE IDPhien = @PhienDangNhap)
    BEGIN
        INSERT INTO PHIEN_NGUOI_DUNG
        (
            IDPhien, LoaiPhien, MaNgonNguUuTien, MaQuocGiaNguoiDung,
            LoaiThietBi, ThongTinTrinhDuyet, URLGioiThieu,
            DongYPhanTich, BatDauLuc, KetThucLuc
        )
        VALUES
        (
            @PhienDangNhap, 'DA_DANG_NHAP', 'vi', 'VN',
            N'Desktop', N'Chrome 135', N'https://vnculturebridge.ai/home',
            1, CAST('2026-03-20T09:00:00' AS DATETIME2(0)), CAST('2026-03-20T10:15:00' AS DATETIME2(0))
        );
    END;

    INSERT INTO NHAT_KY_TIM_KIEM
    (
        IDPhien, TuKhoaTimKiem, MaNgonNgu, KieuTimKiem,
        SoKetQua, CoKetQuaPhuHop, NgayTao
    )
    SELECT v.IDPhien, v.TuKhoaTimKiem, v.MaNgonNgu, v.KieuTimKiem,
           v.SoKetQua, v.CoKetQuaPhuHop, v.NgayTao
    FROM (VALUES
        (@PhienKhach,    N'Vietnamese Tet tradition', 'en', 'NGU_NGHIA', 2, 1, CAST('2026-03-20T08:05:00' AS DATETIME2(0))),
        (@PhienDangNhap, N'cồng chiêng Tây Nguyên',   'vi', 'TU_KHOA',   1, 1, CAST('2026-03-20T09:05:00' AS DATETIME2(0))),
        (@PhienDangNhap, N'áo dài có ý nghĩa gì',     'vi', 'KET_HOP',   1, 1, CAST('2026-03-20T09:20:00' AS DATETIME2(0)))
    ) v(IDPhien, TuKhoaTimKiem, MaNgonNgu, KieuTimKiem, SoKetQua, CoKetQuaPhuHop, NgayTao)
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM NHAT_KY_TIM_KIEM x
        WHERE x.IDPhien = v.IDPhien
          AND x.TuKhoaTimKiem = v.TuKhoaTimKiem
          AND x.NgayTao = v.NgayTao
    );

    INSERT INTO NHAT_KY_XEM_BAI_VIET
    (
        IDPhien, IDBaiViet, MaNgonNgu, ThoiDiemXem, SoGiayXem, NguonTruyCap
    )
    SELECT v.IDPhien, b.IDBaiViet, v.MaNgonNgu, v.ThoiDiemXem, v.SoGiayXem, v.NguonTruyCap
    FROM (VALUES
        (@PhienKhach,    N'tet-nguyen-dan-viet-nam',                    'en', CAST('2026-03-20T08:07:00' AS DATETIME2(0)), 180, 'TIM_KIEM'),
        (@PhienDangNhap, N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'vi', CAST('2026-03-20T09:07:00' AS DATETIME2(0)), 220, 'TIM_KIEM'),
        (@PhienDangNhap, N'ao-dai-viet-nam',                           'vi', CAST('2026-03-20T09:25:00' AS DATETIME2(0)), 90,  'GOI_Y')
    ) v(IDPhien, DuongDanSeo, MaNgonNgu, ThoiDiemXem, SoGiayXem, NguonTruyCap)
    INNER JOIN BAI_VIET b ON b.DuongDanSeo = v.DuongDanSeo
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM NHAT_KY_XEM_BAI_VIET x
        WHERE x.IDPhien = v.IDPhien
          AND x.IDBaiViet = b.IDBaiViet
          AND x.ThoiDiemXem = v.ThoiDiemXem
    );

    /* =========================================================
       N. PHIEN CHAT AI / TIN NHAN / CAU HOI BO SUNG
       ========================================================= */
    IF NOT EXISTS (SELECT 1 FROM PHIEN_CHAT_AI WHERE IDPhienChat = @PhienChat)
    BEGIN
        INSERT INTO PHIEN_CHAT_AI
        (
            IDPhienChat, IDPhienNguoiDung, MaNgonNguPhien, MaQuocGiaNguoiDung,
            TieuDeHoiThoai, BatDauLuc, KetThucLuc
        )
        VALUES
        (
            @PhienChat, @PhienKhach, 'en', 'US',
            N'Ask about Tet and Ao Dai', CAST('2026-03-20T08:08:00' AS DATETIME2(0)), CAST('2026-03-20T08:15:00' AS DATETIME2(0))
        );
    END;

    INSERT INTO TIN_NHAN_CHAT_AI
    (
        IDPhienChat, LoaiNguoiGui, ThuTuTinNhan, MaNgonNgu, NoiDungTinNhan,
        MaYDinh, DiemTinCay, TraLoiTot, NgoaiPhamVi, LaNoiDungNhayCam,
        DuCanCuDuLieu, ThoiGianPhanHoiMs, SoPromptToken, SoCompletionToken, NgayTao
    )
    SELECT
        @PhienChat, v.LoaiNguoiGui, v.ThuTuTinNhan, v.MaNgonNgu, v.NoiDungTinNhan,
        v.MaYDinh, v.DiemTinCay, v.TraLoiTot, v.NgoaiPhamVi, v.LaNoiDungNhayCam,
        v.DuCanCuDuLieu, v.ThoiGianPhanHoiMs, v.SoPromptToken, v.SoCompletionToken, v.NgayTao
    FROM (VALUES
        ('NGUOI_DUNG', 1, 'en', N'What is Tet in Vietnam?',                      'ASK_CULTURE',  NULL, NULL, 0, 0, 1, NULL, NULL, NULL, CAST('2026-03-20T08:08:05' AS DATETIME2(0))),
        ('AI',         2, 'en', N'Tet is the Vietnamese Lunar New Year and the most important traditional celebration in Vietnam.', 'ANSWER_CULTURE', CAST(0.9650 AS DECIMAL(5,4)), 1, 0, 0, 1, 820, 430, 150, CAST('2026-03-20T08:08:06' AS DATETIME2(0))),
        ('NGUOI_DUNG', 3, 'en', N'Do all Vietnamese people wear ao dai every day?', 'ASK_CULTURE', NULL, NULL, 0, 0, 1, NULL, NULL, NULL, CAST('2026-03-20T08:10:00' AS DATETIME2(0))),
        ('AI',         4, 'en', N'No. Ao dai is commonly worn on special occasions, at schools, cultural events or formal ceremonies rather than every day by everyone.', 'ANSWER_CULTURE', CAST(0.9120 AS DECIMAL(5,4)), 1, 0, 0, 1, 910, 510, 170, CAST('2026-03-20T08:10:01' AS DATETIME2(0)))
    ) v(LoaiNguoiGui, ThuTuTinNhan, MaNgonNgu, NoiDungTinNhan, MaYDinh, DiemTinCay, TraLoiTot, NgoaiPhamVi, LaNoiDungNhayCam, DuCanCuDuLieu, ThoiGianPhanHoiMs, SoPromptToken, SoCompletionToken, NgayTao)
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM TIN_NHAN_CHAT_AI x
        WHERE x.IDPhienChat = @PhienChat
          AND x.ThuTuTinNhan = v.ThuTuTinNhan
    );

    INSERT INTO CAU_HOI_CAN_BO_SUNG
    (
        IDTinNhan, LyDo, GoiYXuLy, TrangThai, NgayTao, NgayXuLy
    )
    SELECT t.IDTinNhan, 'THIEU_DU_LIEU', N'Nên mở rộng dữ liệu về trang phục truyền thống theo vùng và bối cảnh sử dụng.', 'DA_XU_LY',
           CAST('2026-03-20T08:11:00' AS DATETIME2(0)), CAST('2026-03-20T08:12:00' AS DATETIME2(0))
    FROM TIN_NHAN_CHAT_AI t
    WHERE t.IDPhienChat = @PhienChat
      AND t.ThuTuTinNhan = 4
      AND NOT EXISTS
      (
          SELECT 1 FROM CAU_HOI_CAN_BO_SUNG x WHERE x.IDTinNhan = t.IDTinNhan
      );

    /* =========================================================
       O. DOT DONG BO AI / CHI TIET DONG BO
       ========================================================= */
    IF NOT EXISTS (SELECT 1 FROM DOT_DONG_BO_TRI_THUC_AI WHERE IDDotDongBo = 1)
    BEGIN
        SET IDENTITY_INSERT DOT_DONG_BO_TRI_THUC_AI ON;
        INSERT INTO DOT_DONG_BO_TRI_THUC_AI
        (
            IDDotDongBo, LoaiDongBo, TrangThai, BatDauLuc, KetThucLuc,
            IDNguoiKichHoat, ThongBaoLoi, NgayTao
        )
        SELECT
            1, 'TANG_DAN', 'THANH_CONG',
            CAST('2026-03-16T08:00:00' AS DATETIME2(0)),
            CAST('2026-03-16T08:10:00' AS DATETIME2(0)),
            u.IDNguoiDung, NULL, CAST('2026-03-16T07:55:00' AS DATETIME2(0))
        FROM QUAN_TRI_NGUOI_DUNG u
        WHERE u.TenDangNhap = N'aiadmin01';
        SET IDENTITY_INSERT DOT_DONG_BO_TRI_THUC_AI OFF;
    END;

    INSERT INTO CHI_TIET_DONG_BO_TRI_THUC_AI
    (
        IDDotDongBo, IDBaiViet, TrangThai, SoDoanChunk, ThongBaoLoi, NgayTao
    )
    SELECT 1, b.IDBaiViet, 'THANH_CONG', v.SoDoanChunk, NULL, v.NgayTao
    FROM (VALUES
        (N'tet-nguyen-dan-viet-nam',                    2, CAST('2026-03-16T08:05:00' AS DATETIME2(0))),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 2, CAST('2026-03-16T08:06:00' AS DATETIME2(0)))
    ) v(DuongDanSeo, SoDoanChunk, NgayTao)
    INNER JOIN BAI_VIET b ON b.DuongDanSeo = v.DuongDanSeo
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM CHI_TIET_DONG_BO_TRI_THUC_AI x
        WHERE x.IDDotDongBo = 1
          AND x.IDBaiViet = b.IDBaiViet
    );

    /* =========================================================
       P. TAI LIEU TRI THUC / DOAN TRI THUC / TRICH DAN
       ========================================================= */
    INSERT INTO TAI_LIEU_TRI_THUC_AI
    (
        IDBaiViet, MaNgonNgu, IDPhienBan, TieuDeTaiLieu, MetadataJson,
        HoatDong, NhaCungCapEmbedding, NgayEmbedding, NgayTao
    )
    SELECT
        b.IDBaiViet,
        v.MaNgonNgu,
        b.IDPhienBanXuatBanHienTai,
        v.TieuDeTaiLieu,
        v.MetadataJson,
        1,
        N'OpenAI-text-embedding',
        CAST('2026-03-16T08:07:00' AS DATETIME2(0)),
        CAST('2026-03-16T08:07:00' AS DATETIME2(0))
    FROM BAI_VIET b
    INNER JOIN (VALUES
        (N'tet-nguyen-dan-viet-nam',                    'vi', N'Tri thức AI - Tết Nguyên Đán',                    N'{"slug":"tet-nguyen-dan-viet-nam","category":"LE_HOI","lang":"vi"}'),
        (N'khong-gian-van-hoa-cong-chieng-tay-nguyen', 'vi', N'Tri thức AI - Cồng chiêng Tây Nguyên',            N'{"slug":"khong-gian-van-hoa-cong-chieng-tay-nguyen","category":"NGHE_THUAT_DAN_GIAN","lang":"vi"}')
    ) v(DuongDanSeo, MaNgonNgu, TieuDeTaiLieu, MetadataJson)
        ON b.DuongDanSeo = v.DuongDanSeo
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM TAI_LIEU_TRI_THUC_AI x
        WHERE x.IDBaiViet = b.IDBaiViet
          AND x.MaNgonNgu = v.MaNgonNgu
    );

    INSERT INTO DOAN_TRI_THUC_AI
    (
        IDTaiLieuTriThuc, SoThuTuDoan, NoiDungDoan, SoToken, KhoaEmbedding, MetadataJson, NgayTao
    )
    SELECT
        tl.IDTaiLieuTriThuc,
        v.SoThuTuDoan,
        v.NoiDungDoan,
        v.SoToken,
        v.KhoaEmbedding,
        v.MetadataJson,
        CAST('2026-03-16T08:08:00' AS DATETIME2(0))
    FROM TAI_LIEU_TRI_THUC_AI tl
    INNER JOIN (VALUES
        (N'Tri thức AI - Tết Nguyên Đán',         1, N'Tết Nguyên Đán là dịp lễ truyền thống quan trọng nhất của người Việt, gắn với đoàn viên gia đình và thờ cúng tổ tiên.', 40, N'emb_tet_001', N'{"section":"intro"}'),
        (N'Tri thức AI - Tết Nguyên Đán',         2, N'Các thực hành phổ biến gồm tất niên, giao thừa, chúc Tết, mừng tuổi và du xuân vào đầu năm âm lịch.', 38, N'emb_tet_002', N'{"section":"customs"}'),
        (N'Tri thức AI - Cồng chiêng Tây Nguyên', 1, N'Không gian văn hoá cồng chiêng Tây Nguyên là di sản gắn với đời sống nghi lễ và cộng đồng của nhiều dân tộc trong khu vực.', 42, N'emb_gong_001', N'{"section":"intro"}'),
        (N'Tri thức AI - Cồng chiêng Tây Nguyên', 2, N'Cồng chiêng không chỉ mang giá trị âm nhạc mà còn gắn với tín ngưỡng, ký ức cộng đồng và hoạt động truyền dạy của nghệ nhân.', 44, N'emb_gong_002', N'{"section":"meaning"}')
    ) v(TieuDeTaiLieu, SoThuTuDoan, NoiDungDoan, SoToken, KhoaEmbedding, MetadataJson)
        ON tl.TieuDeTaiLieu = v.TieuDeTaiLieu
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM DOAN_TRI_THUC_AI x
        WHERE x.IDTaiLieuTriThuc = tl.IDTaiLieuTriThuc
          AND x.SoThuTuDoan = v.SoThuTuDoan
    );

    INSERT INTO TRICH_DAN_TIN_NHAN_AI
    (
        IDTinNhan, IDTaiLieuTriThuc, IDDoan, ThuTuTrichDan, DoanTrichYeu
    )
    SELECT
        t.IDTinNhan,
        tl.IDTaiLieuTriThuc,
        d.IDDoan,
        v.ThuTuTrichDan,
        v.DoanTrichYeu
    FROM (VALUES
        (2, N'Tri thức AI - Tết Nguyên Đán',         1, N'Tết là dịp đoàn viên và khởi đầu năm mới theo âm lịch.'),
        (2, N'Tri thức AI - Tết Nguyên Đán',         2, N'Các tập quán phổ biến gồm chúc Tết, mừng tuổi và du xuân.'),
        (4, N'Tri thức AI - Tết Nguyên Đán',         1, N'Trang phục truyền thống không phải lúc nào cũng là trang phục mặc hằng ngày.')
    ) v(ThuTuTinNhanChat, TieuDeTaiLieu, ThuTuTrichDan, DoanTrichYeu)
    INNER JOIN TIN_NHAN_CHAT_AI t
        ON t.IDPhienChat = @PhienChat
       AND t.ThuTuTinNhan = v.ThuTuTinNhanChat
    INNER JOIN TAI_LIEU_TRI_THUC_AI tl
        ON tl.TieuDeTaiLieu = v.TieuDeTaiLieu
    INNER JOIN DOAN_TRI_THUC_AI d
        ON d.IDTaiLieuTriThuc = tl.IDTaiLieuTriThuc
       AND d.SoThuTuDoan = v.ThuTuTrichDan
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM TRICH_DAN_TIN_NHAN_AI x
        WHERE x.IDTinNhan = t.IDTinNhan
          AND x.IDTaiLieuTriThuc = tl.IDTaiLieuTriThuc
          AND x.IDDoan = d.IDDoan
    );

    /* =========================================================
       Q. PHAN HOI NOI DUNG
       ========================================================= */
    INSERT INTO PHAN_HOI_NOI_DUNG
    (
        IDPhien, LoaiPhanHoi, IDBaiViet, IDTinNhan,
        DiemDanhGia, HuuIch, NoiDungPhanHoi,
        TrangThaiXuLy, IDNguoiXuLy, NgayXuLy, NgayTao
    )
    SELECT
        v.IDPhien, v.LoaiPhanHoi, b.IDBaiViet, t.IDTinNhan,
        v.DiemDanhGia, v.HuuIch, v.NoiDungPhanHoi,
        v.TrangThaiXuLy, u.IDNguoiDung, v.NgayXuLy, v.NgayTao
    FROM (VALUES
        (@PhienKhach,    'BAI_VIET',  N'tet-nguyen-dan-viet-nam',                    NULL, 5, 1, N'Bài viết dễ hiểu và hữu ích cho người nước ngoài.', 'DA_XU_LY', CAST('2026-03-21T09:00:00' AS DATETIME2(0)), CAST('2026-03-20T12:00:00' AS DATETIME2(0))),
        (@PhienKhach,    'TRA_LOI_AI',NULL,                                          2,    4, 1, N'Câu trả lời ngắn gọn, đúng trọng tâm.',              'DA_XU_LY', CAST('2026-03-21T09:05:00' AS DATETIME2(0)), CAST('2026-03-20T12:05:00' AS DATETIME2(0))),
        (@PhienDangNhap, 'CHUNG',      NULL,                                         NULL, NULL, NULL, N'Cần bổ sung thêm bài viết về trang phục theo vùng.', 'MOI',      NULL,                                        CAST('2026-03-20T12:10:00' AS DATETIME2(0)))
    ) v(IDPhien, LoaiPhanHoi, DuongDanSeo, ThuTuTinNhanChat, DiemDanhGia, HuuIch, NoiDungPhanHoi, TrangThaiXuLy, NgayXuLy, NgayTao)
    LEFT JOIN BAI_VIET b ON b.DuongDanSeo = v.DuongDanSeo
    LEFT JOIN TIN_NHAN_CHAT_AI t
        ON t.IDPhienChat = @PhienChat
       AND t.ThuTuTinNhan = v.ThuTuTinNhanChat
    LEFT JOIN QUAN_TRI_NGUOI_DUNG u ON u.TenDangNhap = N'analyst01'
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM PHAN_HOI_NOI_DUNG x
        WHERE ISNULL(x.IDPhien, '00000000-0000-0000-0000-000000000000') = ISNULL(v.IDPhien, '00000000-0000-0000-0000-000000000000')
          AND ISNULL(x.IDBaiViet, -1) = ISNULL(b.IDBaiViet, -1)
          AND ISNULL(x.IDTinNhan, -1) = ISNULL(t.IDTinNhan, -1)
          AND ISNULL(x.NoiDungPhanHoi, N'') = ISNULL(v.NoiDungPhanHoi, N'')
    );

    /* =========================================================
       R. NHAT KY QUAN TRI
       ========================================================= */
    INSERT INTO NHAT_KY_QUAN_TRI
    (
        IDNguoiDung, LoaiHanhDong, TenThucThe, GiaTriKhoa,
        DuLieuCuJson, DuLieuMoiJson, GhiChu, NgayTao
    )
    SELECT
        u.IDNguoiDung, v.LoaiHanhDong, v.TenThucThe, v.GiaTriKhoa,
        v.DuLieuCuJson, v.DuLieuMoiJson, v.GhiChu, v.NgayTao
    FROM (VALUES
        (N'contentadmin', N'CREATE_ARTICLE', N'BAI_VIET', N'tet-nguyen-dan-viet-nam', NULL, N'{"TrangThai":"NHAP"}', N'Tạo mới bài viết seed.', CAST('2026-03-13T08:01:00' AS DATETIME2(0))),
        (N'reviewer01',   N'PUBLISH_ARTICLE',N'BAI_VIET', N'tet-nguyen-dan-viet-nam', N'{"TrangThai":"NHAP"}', N'{"TrangThai":"DA_XUAT_BAN"}', N'Duyệt và xuất bản bài viết Tết.', CAST('2026-03-15T10:05:00' AS DATETIME2(0))),
        (N'aiadmin01',    N'SYNC_AI',        N'DOT_DONG_BO_TRI_THUC_AI', N'1', NULL, N'{"TrangThai":"THANH_CONG"}', N'Đồng bộ tri thức AI thành công.', CAST('2026-03-16T08:11:00' AS DATETIME2(0)))
    ) v(TenDangNhap, LoaiHanhDong, TenThucThe, GiaTriKhoa, DuLieuCuJson, DuLieuMoiJson, GhiChu, NgayTao)
    INNER JOIN QUAN_TRI_NGUOI_DUNG u ON u.TenDangNhap = v.TenDangNhap
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM NHAT_KY_QUAN_TRI x
        WHERE x.IDNguoiDung = u.IDNguoiDung
          AND x.LoaiHanhDong = v.LoaiHanhDong
          AND x.TenThucThe = v.TenThucThe
          AND x.GiaTriKhoa = v.GiaTriKhoa
    );

    COMMIT TRAN;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRAN;

    THROW;
END CATCH;
GO