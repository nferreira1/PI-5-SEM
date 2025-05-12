INSERT INTO order_status (status_id, name, description)
VALUES
(1, 'PENDENTE', 'Pedido pendente'),
(2, 'PAGO', 'Pedido pago'),
(3, 'ENVIADO', 'Pedido enviado'),
(4, 'ENTREGUE', 'Pedido entregue'),
(5, 'CANCELADO', 'Pedido cancelado')
ON CONFLICT (status_id) DO NOTHING;
